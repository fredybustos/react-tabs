import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tab } from '../tab'
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

  it('calls onClick when clicked', () => {
    render(<Tab {...defaultProps} />)
    const tab = screen.getByRole('tab')
    fireEvent.click(tab)
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('applies active styles when active', () => {
    const activeStyles = { style: { color: 'red' }, className: 'custom-active' }
    render(<Tab {...defaultProps} active={true} activeStyles={activeStyles} />)
    const tab = screen.getByRole('tab')
    expect(tab).toHaveStyle({ color: 'red' })
    expect(tab).toHaveClass('active-class', 'custom-active')
  })

  it('applies custom className', () => {
    render(<Tab {...defaultProps} className="custom-class" />)
    const tab = screen.getByRole('tab')
    expect(tab).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Tab {...defaultProps} disabled={true} />)
    const tab = screen.getByRole('tab')
    expect(tab).toBeDisabled()
  })
})
