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

  it('calls onClick when clicked', () => {
    render(<TabComponent {...defaultProps} />)
    const tab = screen.getByRole('tab')
    fireEvent.click(tab)
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<TabComponent {...defaultProps} className="custom-class" />)
    const tab = screen.getByRole('tab')
    expect(tab).toHaveClass('custom-class')
  })

  it('is disabled when disabled prop is true', () => {
    render(<TabComponent {...defaultProps} disabled={true} />)
    const tab = screen.getByRole('tab')
    expect(tab).toHaveAttribute('data-disabled')
  })
})
