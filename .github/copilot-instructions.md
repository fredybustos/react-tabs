# GitHub Copilot Instructions for @fredybustos/react-tabs

## Tech Stack
- React 18.x with TypeScript 5.x
- Functional components with hooks only (no class components)
- Plain CSS (no CSS-in-JS libraries)
- Rollup for bundling
- Jest + React Testing Library for testing

## Code Style Guidelines

### TypeScript
- Always use explicit types for props, returns, and state
- Prefer `interface` for object shapes, `type` for unions and aliases
- Never use `any` type - use `unknown` if type is truly unknown
- Export types from `src/types/index.ts`
- Use TypeScript strict mode features

### React Components
- Use functional components with hooks exclusively
- Extract reusable logic into custom hooks in `src/hooks/`
- Keep components focused and small (Single Responsibility Principle)
- Use explicit prop typing with TypeScript interfaces
- Components should be exportable and composable

### Naming Conventions
- **Components**: PascalCase (e.g., `TabComponent`, `Tabs`)
- **Files**: Match component name (e.g., `index.tsx` for component, `componentName.css` for styles)
- **Hooks**: camelCase with `use` prefix (e.g., `useTabs`)
- **CSS classes**: kebab-case with `rc-` prefix (e.g., `rc-tab`, `rc-tabs_ctn`, `rc-tab_active`)
- **Types/Interfaces**: PascalCase with descriptive suffix (e.g., `TabProps`, `TabComponentProps`, `RenderTabs`)
- **Variables/Functions**: camelCase (e.g., `activeTab`, `onTabActive`)

### File Structure
```
src/
├── component-name/
│   ├── index.tsx          # Component implementation
│   └── component.css      # Component styles
├── hooks/
│   └── useHookName.ts     # Custom hooks
├── types/
│   └── index.ts           # Type definitions
├── utils/
│   └── index.ts           # Utility functions
└── __test__/
    └── ComponentName.test.tsx  # Tests
```

### CSS Guidelines
- Use plain CSS only (no styled-components, emotion, CSS modules, etc.)
- All classes must have `rc-` prefix to avoid naming conflicts
- Use BEM-like naming for nested elements (e.g., `rc-tabs_tab_ctn`, `rc-tab_icon_right`)
- One CSS file per component, placed alongside the component
- Use descriptive class names that reflect the element's purpose
- Active states use `_active` suffix (e.g., `rc-tab_active`)
- Keep styles modular and component-specific

### Import Order
Organize imports in this order:
1. React imports
2. Type imports from local types
3. Component imports
4. Hook imports
5. Utility imports
6. CSS imports

Example:
```typescript
import React from 'react'
import { TabsProps, RenderTabs, TabComponentProps } from '../types'
import { TabComponent } from '../tab'
import useTabs from '../hooks/useTabs'
import { cleanObject } from '../utils'
import './tabs.css'
```

### Component Props
- Define clear prop interfaces in `src/types/index.ts`
- Provide default values using destructuring
- Use optional props with `?` when appropriate
- Include `children` prop when component accepts child elements
- Document complex props with JSDoc comments

### Testing Requirements
- Write tests for all new features
- Use Jest + React Testing Library
- Test user behavior, not implementation details
- Place tests in `src/__test__/` directory
- File naming: `ComponentName.test.tsx`
- Use `fireEvent` for user interactions
- Mock CSS modules when needed
- Aim for high test coverage

### Code Formatting
- 2 spaces indentation
- Single quotes for strings
- No semicolons
- Max line length: 100 characters
- Use trailing commas in objects and arrays
- Run `npm run lint` before committing

### Commit Messages
Follow Conventional Commits specification:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code refactoring
- `style:` Formatting changes
- `chore:` Maintenance tasks

Example: `feat: add icon support to Tab component`

### React Patterns
- Use destructuring for props
- Extract complex logic into custom hooks
- Keep JSX readable and well-formatted
- Use conditional rendering appropriately
- Handle events with clear handler names (e.g., `onClick`, `onTabActive`)
- Use `React.FC` type or explicit prop typing

### Accessibility
- Use semantic HTML and ARIA attributes
- Add `role`, `aria-selected`, `aria-controls` for tab components
- Include `data-testid` for testing purposes
- Ensure keyboard navigation support
- Provide meaningful text alternatives

## Project-Specific Patterns

### Tab Component Pattern
- `Tabs` component manages state and renders tab headers
- `TabComponent` is the individual tab button
- `Tab` is exported as a user-facing component for children
- Active tab tracking via `useTabs` custom hook
- Support for icons, disabled states, and custom styling

### State Management
- Use `useState` for local component state
- Custom hooks encapsulate reusable stateful logic
- Pass callbacks via props (e.g., `onSelect`, `onTabActive`)
- No global state management library needed

### Styling Pattern
- Components have base styles in their CSS files
- Support for custom styles via `style` and `className` props
- Active styles via `activeStyles` prop with `{ style: {}, className: '' }` structure
- Merge custom styles with base styles

## Don't Do
- ❌ Don't use class components
- ❌ Don't use CSS-in-JS solutions (styled-components, emotion, etc.)
- ❌ Don't use `any` type
- ❌ Don't create inline styles without props support
- ❌ Don't skip prop type definitions
- ❌ Don't write tests that test implementation details
- ❌ Don't add dependencies without discussing first
- ❌ Don't modify build configuration without understanding impact

## Build & Distribution
- Library outputs CommonJS (`dist/cjs/`) and ES Modules (`dist/esm/`)
- Type definitions in `dist/index.d.ts`
- CSS minified as `dist/esm/tabs.min.css`
- Rollup handles bundling and optimization
- Keep bundle size small and tree-shakeable
