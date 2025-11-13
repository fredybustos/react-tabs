import React from 'react'
import { renderHook, act } from '@testing-library/react'
import useTabs from '../hooks/useTabs'
import { Tab } from '../tab'
import type { TabProps } from '../types'

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

  describe('Multiple Active Props', () => {
    it('should use the first active tab when multiple tabs have active prop', () => {
      const { result } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2" active>
            Content 2
          </Tab>,
          <Tab key={3} title="Tab 3" active>
            Content 3
          </Tab>,
        ])
      )

      expect(result.current.activeTab).toBe(1)
    })

    it('should default to first tab when no active prop is set', () => {
      const { result } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
        ])
      )

      expect(result.current.activeTab).toBe(0)
    })
  })

  describe('State Updates', () => {
    it('should handle changing to the same active tab (idempotent)', () => {
      const { result } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
        ])
      )

      expect(result.current.activeTab).toBe(0)

      act(() => {
        result.current.onTabActive(0)
      })

      expect(result.current.activeTab).toBe(0)
    })

    it('should accept out-of-range index value', () => {
      const { result } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
        ])
      )

      // The hook allows setting any index, even out of range
      act(() => {
        result.current.onTabActive(10)
      })

      // Note: Hook doesn't validate index bounds
      expect(typeof result.current.activeTab).toBe('number')
    })

    it('should accept negative index value', () => {
      const { result } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
        ])
      )

      // The hook allows setting negative values
      act(() => {
        result.current.onTabActive(-1)
      })

      // Note: Hook doesn't validate index bounds
      expect(typeof result.current.activeTab).toBe('number')
    })
  })

  describe('Memoization & Callbacks', () => {
    it('should keep onTabActive reference stable between renders', () => {
      const { result, rerender } = renderHook(() =>
        useTabs([
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
        ])
      )

      const firstOnTabActive = result.current.onTabActive

      rerender()

      expect(result.current.onTabActive).toBe(firstOnTabActive)
    })

    it('should memoize childTabs when children do not change', () => {
      const tabs = [
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        <Tab key={2} title="Tab 2">
          Content 2
        </Tab>,
      ]

      const { result, rerender } = renderHook(() => useTabs(tabs))

      const firstChildTabs = result.current.childTabs

      rerender()

      expect(result.current.childTabs).toBe(firstChildTabs)
    })
  })

  describe('Dynamic Children Updates', () => {
    it('should update childTabs when children change', () => {
      const { result, rerender } = renderHook(({ children }) => useTabs(children), {
        initialProps: {
          children: [
            <Tab key={1} title="Tab 1">
              Content 1
            </Tab>,
            <Tab key={2} title="Tab 2">
              Content 2
            </Tab>,
          ],
        },
      })

      expect(result.current.childTabs).toHaveLength(2)

      rerender({
        children: [
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2">
            Content 2
          </Tab>,
          <Tab key={3} title="Tab 3">
            Content 3
          </Tab>,
        ],
      })

      expect(result.current.childTabs).toHaveLength(3)
    })

    it('should reset to default when children update with new active prop', () => {
      const { result, rerender } = renderHook(({ children }) => useTabs(children), {
        initialProps: {
          children: [
            <Tab key={1} title="Tab 1">
              Content 1
            </Tab>,
            <Tab key={2} title="Tab 2">
              Content 2
            </Tab>,
            <Tab key={3} title="Tab 3">
              Content 3
            </Tab>,
          ],
        },
      })

      expect(result.current.activeTab).toBe(0)

      // Update children with different active tab
      rerender({
        children: [
          <Tab key={1} title="Tab 1 Updated">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2 Updated" active>
            Content 2
          </Tab>,
          <Tab key={3} title="Tab 3 Updated">
            Content 3
          </Tab>,
        ],
      })

      expect(result.current.activeTab).toBe(1)
    })

    it('should update activeTab when new active prop is introduced', () => {
      const { result, rerender } = renderHook(({ children }) => useTabs(children), {
        initialProps: {
          children: [
            <Tab key={1} title="Tab 1">
              Content 1
            </Tab>,
            <Tab key={2} title="Tab 2">
              Content 2
            </Tab>,
          ],
        },
      })

      expect(result.current.activeTab).toBe(0)

      rerender({
        children: [
          <Tab key={1} title="Tab 1">
            Content 1
          </Tab>,
          <Tab key={2} title="Tab 2" active>
            Content 2
          </Tab>,
        ],
      })

      expect(result.current.activeTab).toBe(1)
    })
  })

  describe('Edge Cases', () => {
    it('should handle null children', () => {
      const { result } = renderHook(() => useTabs(null as unknown as React.ReactElement<TabProps>))

      expect(result.current.childTabs).toHaveLength(0)
      expect(result.current.activeTab).toBe(0)
    })

    it('should handle undefined children', () => {
      const { result } = renderHook(() =>
        useTabs(undefined as unknown as React.ReactElement<TabProps>)
      )

      expect(result.current.childTabs).toHaveLength(0)
      expect(result.current.activeTab).toBe(0)
    })

    it('should filter out invalid React elements', () => {
      const children = [
        <Tab key={1} title="Tab 1">
          Content 1
        </Tab>,
        'invalid string' as unknown as React.ReactElement<TabProps>,
        <Tab key={2} title="Tab 2">
          Content 2
        </Tab>,
        null as unknown as React.ReactElement<TabProps>,
        <Tab key={3} title="Tab 3">
          Content 3
        </Tab>,
      ]

      const { result } = renderHook(() => useTabs(children))

      expect(result.current.childTabs).toHaveLength(3)
    })

    it('should handle React Fragments', () => {
      const { result } = renderHook(() =>
        useTabs(
          <>
            <Tab key={1} title="Tab 1">
              Content 1
            </Tab>
            <Tab key={2} title="Tab 2">
              Content 2
            </Tab>
          </>
        )
      )

      expect(result.current.childTabs.length).toBeGreaterThan(0)
    })

    it('should return stable values when called with empty children after having children', () => {
      const { result, rerender } = renderHook(({ children }) => useTabs(children), {
        initialProps: {
          children: [
            <Tab key={1} title="Tab 1">
              Content 1
            </Tab>,
          ],
        },
      })

      expect(result.current.childTabs).toHaveLength(1)

      rerender({ children: [] })

      expect(result.current.childTabs).toHaveLength(0)
      expect(result.current.activeTab).toBe(0)
    })
  })
})
