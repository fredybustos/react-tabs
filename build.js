const fs = require('fs').promises
const path = require('path')
const esbuild = require('esbuild')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssModules = require('postcss-modules')
const cssnano = require('cssnano')

const cssModulesPlugin = {
  name: 'css-modules',
  setup(build) {
    build.onResolve({ filter: /\.css$/ }, args => ({
      path: path.resolve(args.resolveDir, args.path),
      namespace: 'css-module',
    }))

    build.onLoad({ filter: /\.css$/, namespace: 'css-module' }, async args => {
      const source = await fs.readFile(args.path, 'utf8')
      let cssModulesJSON = {}

      const result = await postcss([
        cssModules({
          getJSON: (_, json) => (cssModulesJSON = json),
        }),
        autoprefixer,
        cssnano({ preset: 'default' }),
      ]).process(source, { from: args.path })

      const jsContent = `
        const css = ${JSON.stringify(result.css)};
        const cssModules = ${JSON.stringify(cssModulesJSON)};
        if (typeof document !== 'undefined') {
          const style = document.createElement('style');
          style.textContent = css;
          document.head.appendChild(style);
        }
        export default cssModules;
      `

      return {
        contents: jsContent,
        loader: 'js',
      }
    })
  },
}

async function build() {
  try {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/index.js',
      format: 'esm',
      target: ['es6'],
      external: ['react', 'react-dom'],
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
      plugins: [cssModulesPlugin],
      metafile: true,
      minify: true,
    })

    await new Promise((resolve, reject) => {
      require('child_process').exec(
        'tsc --emitDeclarationOnly --outDir dist',
        (error, stdout, stderr) => {
          if (error) {
            console.error('Error generating TypeScript declarations:', stderr)
            reject(error)
          } else {
            console.log('TypeScript declarations generated')
            resolve()
          }
        }
      )
    })
  } catch (error) {
    console.error('Build failed:', error)
    process.exit(1)
  }
}

build()
