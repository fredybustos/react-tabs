import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TabComponent } from '../tab'
import '@testing-library/jest-dom'

jest.mock('../tab/styles.module.css', () => ({
  tab: 'tab-class',
  active: 'active-class',
}))

describe('Tab Component', () => {
  const defaultProps = {
    onClick: jest.fn(),
    title: 'Test Tab',
    testId: 'test',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with title text', () => {
      render(<TabComponent {...defaultProps} />)
      expect(screen.getByText('Test Tab')).toBeInTheDocument()
    })

    it('renders with role="tab" attribute', () => {
      render(<TabComponent {...defaultProps} />)
      const tab = screen.getByRole('tab')
      expect(tab).toBeInTheDocument()
    })

    it('applies base rc-tab class', () => {
      render(<TabComponent {...defaultProps} />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rc-tab')
    })

    it('does not render when hideTab is true', () => {
      render(<TabComponent {...defaultProps} hideTab />)
      expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('calls onClick when clicked', () => {
      render(<TabComponent {...defaultProps} />)
      const tab = screen.getByRole('tab')
      fireEvent.click(tab)
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick even when disabled', () => {
      const mockClick = jest.fn()
      render(<TabComponent {...defaultProps} onClick={mockClick} disabled />)
      const tab = screen.getByRole('tab')
      fireEvent.click(tab)
      expect(mockClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Props - Styling', () => {
    it('applies custom className', () => {
      render(<TabComponent {...defaultProps} className="custom-class" />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rc-tab', 'custom-class')
    })

    it('applies custom style', () => {
      const customStyle = { backgroundColor: 'blue', color: 'white' }
      render(<TabComponent {...defaultProps} style={customStyle} />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveStyle(customStyle)
    })
  })

  describe('Active State', () => {
    it('sets aria-selected to true when active', () => {
      render(<TabComponent {...defaultProps} active />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('aria-selected', 'true')
    })

    it('sets aria-selected to false when not active', () => {
      render(<TabComponent {...defaultProps} active={false} />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('aria-selected', 'false')
    })

    it('applies rc-tab_active class when active', () => {
      render(<TabComponent {...defaultProps} active />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rc-tab_active')
    })

    it('applies activeStyles.className when active', () => {
      const activeStyles = { style: {}, className: 'custom-active' }
      render(<TabComponent {...defaultProps} active activeStyles={activeStyles} />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rc-tab_active', 'custom-active')
    })

    it('merges activeStyles.style when active', () => {
      const baseStyle = { color: 'black' }
      const activeStyles = { style: { fontWeight: 'bold' }, className: '' }
      render(
        <TabComponent {...defaultProps} active style={baseStyle} activeStyles={activeStyles} />
      )
      const tab = screen.getByRole('tab')
      expect(tab).toHaveStyle({ color: 'black', fontWeight: 'bold' })
    })

    it('does not apply activeStyles when not active', () => {
      const activeStyles = { style: { fontWeight: 'bold' }, className: 'custom-active' }
      render(<TabComponent {...defaultProps} active={false} activeStyles={activeStyles} />)
      const tab = screen.getByRole('tab')
      expect(tab).not.toHaveClass('custom-active')
    })
  })

  describe('Disabled State', () => {
    it('sets data-disabled to true when disabled', () => {
      render(<TabComponent {...defaultProps} disabled />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('data-disabled', 'true')
    })

    it('sets data-disabled to false when not disabled', () => {
      render(<TabComponent {...defaultProps} disabled={false} />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('data-disabled', 'false')
    })
  })

  describe('Icons', () => {
    it('renders with icon on the left', () => {
      const icon = <span data-testid="icon">🏠</span>
      render(<TabComponent {...defaultProps} icon={icon} />)
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Test Tab')).toBeInTheDocument()
    })

    it('applies rc-tab_icon class to icon container', () => {
      const icon = <span>🏠</span>
      const { container } = render(<TabComponent {...defaultProps} icon={icon} />)
      const iconContainer = container.querySelector('.rc-tab_icon')
      expect(iconContainer).toBeInTheDocument()
    })

    it('applies rc-tab_icon_right class when rightIcon is true', () => {
      const icon = <span>🏠</span>
      const { container } = render(<TabComponent {...defaultProps} icon={icon} rightIcon />)
      const iconContainer = container.querySelector('.rc-tab_icon')
      expect(iconContainer).toHaveClass('rc-tab_icon', 'rc-tab_icon_right')
    })

    it('wraps title in span when icon is present', () => {
      const icon = <span data-testid="icon">🏠</span>
      render(<TabComponent {...defaultProps} title="My Tab" icon={icon} />)
      expect(screen.getByText('My Tab')).toBeInTheDocument()
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('renders title directly when no icon', () => {
      render(<TabComponent {...defaultProps} />)
      const tab = screen.getByRole('tab')
      expect(tab.textContent).toBe('Test Tab')
    })
  })

  describe('Accessibility', () => {
    it('sets aria-controls attribute', () => {
      render(<TabComponent {...defaultProps} testId="test" />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('aria-controls', 'panel-test')
    })

    it('sets data-testid attribute with correct format', () => {
      render(<TabComponent {...defaultProps} testId="custom-id" />)
      const tab = screen.getByTestId('tab-custom-id')
      expect(tab).toBeInTheDocument()
    })

    it('uses default testId when not provided', () => {
      const { onClick, title } = defaultProps
      render(<TabComponent onClick={onClick} title={title} />)
      const tab = screen.getByTestId('tab-testid')
      expect(tab).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles both active and disabled states together', () => {
      render(<TabComponent {...defaultProps} active disabled />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveAttribute('aria-selected', 'true')
      expect(tab).toHaveAttribute('data-disabled', 'true')
      expect(tab).toHaveClass('rc-tab_active')
    })

    it('handles empty style objects', () => {
      render(
        <TabComponent {...defaultProps} style={{}} activeStyles={{ style: {}, className: '' }} />
      )
      const tab = screen.getByRole('tab')
      expect(tab).toBeInTheDocument()
    })

    it('handles empty className strings', () => {
      render(<TabComponent {...defaultProps} className="" />)
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rc-tab')
    })
  })
})
