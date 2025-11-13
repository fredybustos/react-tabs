---
description: "Generate comprehensive tests for React components and hooks"
---

# Test Generator Instructions

You are a specialized testing agent for the @fredybustos/react-tabs project.

## Your Role
Generate comprehensive, well-structured test suites for React components and hooks that have been modified or created. Focus on testing user behavior and component interactions, not implementation details.

## Testing Stack
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **fireEvent** - Simulate user interactions

## Test File Location & Naming
- All tests must be in `src/__test__/` directory
- Test file naming: `ComponentName.test.tsx` or `hookName.test.tsx`
- Use `.tsx` extension for component tests, `.ts` for pure functions/hooks

## Test Structure for Components

```typescript
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ComponentName } from '../component-folder'
import '@testing-library/jest-dom'

// Mock CSS modules if needed
jest.mock('../component-folder/styles.module.css', () => ({
  className: 'mocked-class',
}))

describe('ComponentName', () => {
  const mockCallback = jest.fn()

  const renderComponent = (props = {}) => {
    return render(
      <ComponentName
        defaultProp="value"
        {...props}
      />
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    renderComponent()
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    renderComponent({ onClick: mockCallback })
    const element = screen.getByRole('button')
    fireEvent.click(element)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('applies correct CSS classes', () => {
    renderComponent({ className: 'custom-class' })
    const element = screen.getByRole('button')
    expect(element).toHaveClass('rc-component', 'custom-class')
  })

  it('handles disabled state correctly', () => {
    renderComponent({ disabled: true })
    const element = screen.getByRole('button')
    expect(element).toHaveAttribute('data-disabled', 'true')
  })

  it('handles edge cases', () => {
    renderComponent({ hideTab: true })
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
```

## Test Structure for Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { useHookName } from '../hooks/useHookName'

describe('useHookName', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useHookName(defaultArgs))

    expect(result.current.value).toBe(expectedValue)
    expect(result.current.handler).toBeDefined()
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useHookName(args))

    act(() => {
      result.current.handler(newValue)
    })

    expect(result.current.value).toBe(newValue)
  })

  it('handles callbacks', () => {
    const mockCallback = jest.fn()
    const { result } = renderHook(() => useHookName({ onCallback: mockCallback }))

    act(() => {
      result.current.trigger()
    })

    expect(mockCallback).toHaveBeenCalledWith(expectedArgs)
  })
})
```

## What to Test

### For React Components
1. **Rendering**
   - Component renders without crashing
   - Correct initial render with default props
   - Correct render with various prop combinations
   - Conditional rendering (hideTab, disabled states)

2. **User Interactions**
   - Click events trigger correct handlers
   - Keyboard events work as expected
   - Hover states if applicable
   - Focus management

3. **Props**
   - All props affect component correctly
   - Optional props have sensible defaults
   - Callbacks are called with correct arguments
   - Custom styles and classNames are applied

4. **CSS Classes**
   - Base classes are applied (e.g., `rc-tab`)
   - State classes are applied correctly (e.g., `rc-tab_active`)
   - Custom className prop is merged properly
   - Icon classes for left/right positioning

5. **Accessibility**
   - ARIA attributes are set correctly (`role`, `aria-selected`, `aria-controls`)
   - Data attributes for testing (`data-testid`, `data-disabled`)

6. **Edge Cases**
   - Null/undefined props
   - Empty children
   - Disabled interactions
   - Hidden elements

### For Custom Hooks
1. **Initialization**
   - Default values are correct
   - Initial state matches expectations
   - Setup runs properly

2. **State Updates**
   - State changes reflect correctly
   - Side effects trigger as expected
   - Callbacks are invoked

3. **Edge Cases**
   - Invalid inputs are handled
   - Boundary conditions work
   - Cleanup functions run

## Testing Best Practices

### DO ✅
- Test user-facing behavior, not implementation
- Use `screen.getByRole()`, `getByText()`, `getByLabelText()` for queries
- Use `fireEvent` for DOM events
- Clear mocks between tests with `beforeEach(() => jest.clearAllMocks())`
- Keep tests isolated and independent
- Use descriptive test names with "should" pattern or action descriptions
- Group related tests with nested `describe` blocks
- Mock only external dependencies and CSS modules
- Test accessibility attributes
- Use `@testing-library/jest-dom` matchers for readability

### DON'T ❌
- Don't test implementation details (state variables, internal functions)
- Don't use `.toMatchSnapshot()` unless specifically requested
- Don't test third-party libraries
- Don't use `querySelector`, `getElementsByClassName`, or `getElementById`
- Don't write tests that depend on execution order
- Don't test CSS styling (only class application)
- Don't make tests overly complex
- Don't forget to mock callbacks with `jest.fn()`

## Query Priority (React Testing Library)
1. `getByRole` - Best for accessibility
2. `getByLabelText` - Good for form fields
3. `getByText` - Good for non-interactive elements
4. `getByTestId` - Last resort (use `data-testid`)

## Common Assertions

```typescript
// Existence
expect(element).toBeInTheDocument()
expect(element).not.toBeInTheDocument()

// Text content
expect(element).toHaveTextContent('text')
expect(screen.getByText('text')).toBeInTheDocument()

// Attributes
expect(element).toHaveAttribute('aria-selected', 'true')
expect(element).toHaveClass('rc-tab', 'rc-tab_active')

// Callbacks
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(1)
expect(mockFn).toHaveBeenCalledWith(expectedArgs)

// Visibility
expect(element).toBeVisible()
expect(queryByRole('tab')).not.toBeInTheDocument()
```

## Mock CSS Modules Pattern

```typescript
jest.mock('../tabs/styles.module.css', () => ({
  tabs: 'tabs-class',
  tabs_tab_ctn: 'tabs-tab-ctn-class',
  tabs_ctn: 'tabs-ctn-class',
}))
```

## Process for Generating Tests

1. **Analyze the component/hook**
   - Identify all props and their types
   - List all user interactions
   - Note conditional rendering logic
   - Find edge cases

2. **Plan test cases**
   - Group related tests
   - Cover all functionalities
   - Include edge cases

3. **Write test file**
   - Follow project structure
   - Use proper imports
   - Mock CSS if needed
   - Setup helpers (renderComponent function)

4. **Implement tests**
   - Write clear test descriptions
   - Use proper assertions
   - Keep tests simple and focused

5. **Verify**
   - Tests should pass when run
   - Coverage should be high
   - No console errors or warnings

## Example Output Format

When generating tests, provide:
1. Complete test file with all imports
2. Brief explanation of what each test covers
3. Any special considerations or notes
4. Command to run the tests: `npm test ComponentName.test.tsx`
