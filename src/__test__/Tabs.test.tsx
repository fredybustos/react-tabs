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

  it('applies custom className to content container', () => {
    const customClass = 'custom-content-class'
    const { container } = render(
      <Tabs className={customClass}>
        <TabComponent title="Tab 1">Content 1</TabComponent>
      </Tabs>
    )
    const contentContainer = container.querySelector('.rc-tabs_ctn')
    expect(contentContainer).toHaveClass('rc-tabs_ctn', customClass)
  })

  it('applies custom style to content container', () => {
    const customStyle = { padding: '20px', backgroundColor: 'blue' }
    const { container } = render(
      <Tabs style={customStyle}>
        <TabComponent title="Tab 1">Content 1</TabComponent>
      </Tabs>
    )
    const contentContainer = container.querySelector('.rc-tabs_ctn')
    expect(contentContainer).toHaveStyle(customStyle)
  })

  it('marks disabled tab with data-disabled attribute', () => {
    render(
      <Tabs>
        <TabComponent title="Tab 1">Content 1</TabComponent>
        <TabComponent title="Tab 2" disabled>
          Content 2
        </TabComponent>
      </Tabs>
    )
    const disabledTab = screen.getByText('Tab 2')
    expect(disabledTab).toHaveAttribute('data-disabled', 'true')
  })

  it('handles clicking the already active tab', () => {
    renderTabs()
    const tab1 = screen.getByText('Tab 1')
    fireEvent.click(tab1)
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('renders with a single child tab', () => {
    render(
      <Tabs>
        <TabComponent title="Only Tab">Only Content</TabComponent>
      </Tabs>
    )
    expect(screen.getByText('Only Tab')).toBeInTheDocument()
    expect(screen.getByText('Only Content')).toBeInTheDocument()
  })

  it('applies correct base CSS classes', () => {
    const { container } = render(
      <Tabs>
        <TabComponent title="Tab 1">Content 1</TabComponent>
      </Tabs>
    )
    expect(container.querySelector('.rc-tabs')).toBeInTheDocument()
    expect(container.querySelector('.rc-tabs_tab_ctn')).toBeInTheDocument()
    expect(container.querySelector('.rc-tabs_ctn')).toBeInTheDocument()
  })

  it('renders tabs with icons', () => {
    const IconComponent = () => <span>🏠</span>
    render(
      <Tabs>
        <TabComponent title="Home" icon={<IconComponent />}>
          Home Content
        </TabComponent>
        <TabComponent title="Settings">Settings Content</TabComponent>
      </Tabs>
    )
    expect(screen.getByText('🏠')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('calls onSelect with correct element data', () => {
    render(
      <Tabs onSelect={mockOnSelect}>
        <TabComponent title="Tab 1" className="custom-tab">
          Content 1
        </TabComponent>
        <TabComponent title="Tab 2">Content 2</TabComponent>
      </Tabs>
    )
    fireEvent.click(screen.getByText('Tab 2'))
    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        index: 1,
        element: expect.objectContaining({
          title: 'Tab 2',
        }),
      })
    )
  })

  it('switches between multiple tabs correctly', () => {
    renderTabs()

    // Click Tab 2
    fireEvent.click(screen.getByText('Tab 2'))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

    // Click Tab 1
    fireEvent.click(screen.getByText('Tab 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('maintains tab state after multiple interactions', () => {
    renderTabs()

    fireEvent.click(screen.getByText('Tab 2'))
    fireEvent.click(screen.getByText('Tab 1'))
    fireEvent.click(screen.getByText('Tab 2'))

    expect(mockOnSelect).toHaveBeenCalledTimes(3)
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('handles tabs with custom styles per tab', () => {
    const customStyle1 = { backgroundColor: 'blue' }
    const customStyle2 = { backgroundColor: 'red' }
    render(
      <Tabs>
        <TabComponent title="Tab 1" style={customStyle1}>
          Content 1
        </TabComponent>
        <TabComponent title="Tab 2" style={customStyle2}>
          Content 2
        </TabComponent>
      </Tabs>
    )

    const tab1 = screen.getByText('Tab 1')
    const tab2 = screen.getByText('Tab 2')

    expect(tab1).toHaveStyle({ backgroundColor: 'blue' })
    expect(tab2).toHaveStyle({ backgroundColor: 'red' })
  })
})
