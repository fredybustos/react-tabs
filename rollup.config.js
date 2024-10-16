import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import esbuild from 'rollup-plugin-esbuild'
import cssnano from 'cssnano'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      esbuild.default(),
      commonjs(),
      nodeResolve(),
      peerDepsExternal(),
      postcss({
        extract: 'tabs.min.css',
        plugins: [cssnano()],
        minimize: true,
      }),
    ],
    external: ['react'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/.css$/],
  },
]
