import React from 'react'
import { renderHook, act } from '@testing-library/react'
import useTabs from '../hooks/useTabs'
import { Tab } from '../tab'

describe('useTabs Hook', () => {
  it('should initialize with the first tab active', () => {
    const { result } = renderHook(() =>
      useTabs([
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2">
          Content 2
        </Tab>,
        <Tab key={3} title="Tab 3">
          Content 3
        </Tab>,
      ])
    )

    expect(result.current.activeTab).toBe(0)
    expect(result.current.childTabs).toHaveLength(3)
  })
  it('should initialize with the second tab active', () => {
    const { result } = renderHook(() =>
      useTabs([
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2" active>
          Content 2
        </Tab>,
        <Tab key={3} title="Tab 3">
          Content 3
        </Tab>,
      ])
    )

    expect(result.current.activeTab).toBe(1)
    expect(result.current.childTabs).toHaveLength(3)
  })

  it('should change active tab when onTabActive is called', () => {
    const { result } = renderHook(() =>
      useTabs([
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2">
          Content 2
        </Tab>,
        <Tab key={3} title="Tab 3" active>
          Content 3
        </Tab>,
      ])
    )

    act(() => {
      result.current.onTabActive(2)
    })

    expect(result.current.activeTab).toBe(2)
  })

  it('should handle a single tab', () => {
    const { result } = renderHook(() => useTabs(<Tab title="Single Tab">Single Content</Tab>))

    expect(result.current.activeTab).toBe(0)
    expect(result.current.childTabs).toHaveLength(1)
  })

  it('should handle empty children', () => {
    const { result } = renderHook(() => useTabs([]))

    expect(result.current.activeTab).toBe(0)
    expect(result.current.childTabs).toHaveLength(0)
  })

  it('should handle disabled tab', () => {
    const { result } = renderHook(() =>
      useTabs([
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2" disabled>
          Content 2
        </Tab>,
        <Tab key={3} title="Tab 3">
          Content 3
        </Tab>,
      ])
    )

    act(() => {
      result.current.onTabActive(1)
    })

    expect(result.current.activeTab).not.toBe(1)
  })

  it('should handle hideTab', () => {
    const { result } = renderHook(() =>
      useTabs([
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2" hideTab>
          Content 2
        </Tab>,
        <Tab key={3} title="Tab 3">
          Content 3
        </Tab>,
      ])
    )

    expect(result.current.childTabs).toHaveLength(3)
  })
})
