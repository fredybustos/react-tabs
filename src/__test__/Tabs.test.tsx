import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from '../tabs'
import { TabComponent } from '../tab'
import '@testing-library/jest-dom'

jest.mock('../tabs/styles.module.css', () => ({
  tabs: 'tabs-class',
  tabs_tab_ctn: 'tabs-tab-ctn-class',
  tabs_ctn: 'tabs-ctn-class',
}))

describe('Tabs Component', () => {
  const mockOnSelect = jest.fn()

  const renderTabs = () => {
    return render(
      <Tabs onSelect={mockOnSelect}>
        <TabComponent title="Tab 1">Content 1</TabComponent>
        <TabComponent title="Tab 2">Content 2</TabComponent>
        <TabComponent title="Tab 3" disabled>
          Content 3
        </TabComponent>
      </Tabs>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all tabs', () => {
    renderTabs()
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('renders the content of the first tab by default', () => {
    renderTabs()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument()
  })

  it('changes content when a tab is clicked', () => {
    renderTabs()
    fireEvent.click(screen.getByText('Tab 2'))
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('calls onSelect when a tab is clicked', () => {
    renderTabs()
    fireEvent.click(screen.getByText('Tab 2'))
    expect(mockOnSelect).toHaveBeenCalledWith(expect.objectContaining({ index: 1 }))
  })

  it('applies active styles to the active tab', () => {
    renderTabs()
    const activeTab = screen.getByText('Tab 1')
    expect(activeTab).toHaveAttribute('aria-selected', 'true')
  })

  it('hides tab when hideTab prop is true', () => {
    render(
      <Tabs>
        <TabComponent title="Tab 1">Content 1</TabComponent>
        <TabComponent title="Hidden Tab" hideTab>
          Hidden Content
        </TabComponent>
      </Tabs>
    )
    expect(screen.queryByText('Hidden Tab')).not.toBeInTheDocument()
  })

  it('applies activeStyles to the active tab', () => {
    const activeStyles = { style: { color: 'red' }, className: 'rc-tab_active' }
    render(
      <Tabs activeStyles={activeStyles}>
        <TabComponent title="Tab 1">Content 1</TabComponent>
        <TabComponent title="Tab 2">Content 2</TabComponent>
      </Tabs>
    )
    const activeTab = screen.getByText('Tab 1')
    expect(activeTab).toHaveStyle({ color: 'red' })
    expect(activeTab).toHaveClass('rc-tab_active')
  })
})
