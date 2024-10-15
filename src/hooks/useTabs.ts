import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { TabProps } from '../types'

export default function useTabs(
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]
) {
  const [activeTab, setActiveTab] = useState(0)

  const childTabs = useMemo(() => {
    return React.Children.toArray(children).filter(
      React.isValidElement
    ) as React.ReactElement<TabProps>[]
  }, [children])

  useEffect(() => {
    if (childTabs.length > 0) {
      const filteredActive = childTabs.findIndex(item => item.props.active)
      const defaultActive = filteredActive === -1 ? 0 : filteredActive
      setActiveTab(prevActive => (prevActive === defaultActive ? prevActive : defaultActive))
    }
  }, [childTabs])

  const onTabActive = useCallback((index: number) => setActiveTab(index), [])

  return { childTabs, activeTab, onTabActive }
}
