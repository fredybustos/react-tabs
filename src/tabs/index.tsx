import React from 'react'
import { TabProps, TabsProps, RenderTabs } from '../types'
import { Tab } from '../tab'
import useTabs from '../hooks/useTabs'
import { cleanObject } from '../utils'
import './tabs.css'

const renderTab = ({ child, index, activeTab, activeStyles, onTabActive }: RenderTabs) => {
  const { title, disabled, hideTab, style, className, active } = child.props
  return (
    <Tab
      key={index}
      title={title}
      style={style}
      hideTab={hideTab}
      disabled={disabled}
      className={className}
      activeStyles={activeStyles}
      active={index === activeTab}
      onClick={() =>
        onTabActive({
          index,
          element: { title, disabled, hideTab, style, className, active, activeStyles },
        })
      }
    />
  )
}

export const Tabs = ({
  children,
  onSelect,
  style = {},
  className = '',
  activeStyles = { style: {}, className: '' },
}: TabsProps) => {
  const { onTabActive, activeTab, childTabs } = useTabs(children)

  const renderChildren = childTabs.reduce<Record<string, React.ReactNode>>(
    (acc, current, index) => {
      return {
        ...acc,
        [index]: current.props.children,
      }
    },
    {}
  )

  const setActiveTab = (arg: { index: number; element: TabProps }) => {
    onTabActive(arg.index)
    onSelect?.({ index: arg.index, element: cleanObject({ ...arg.element }) })
  }

  return (
    <div className="rc-tabs">
      <div className="rc-tabs_tab_ctn">
        {childTabs.map((child, index) => {
          const { title, disabled, hideTab, style, className, active } = child.props
          return renderTab({
            activeStyles,
            activeTab,
            child,
            index,
            onTabActive: () =>
              setActiveTab({
                index,
                element: {
                  title,
                  disabled,
                  hideTab,
                  style,
                  className,
                  active,
                  activeStyles,
                },
              }),
          })
        })}
      </div>
      <div className={`rc-tabs_ctn ${className}`} style={style}>
        {renderChildren[activeTab]}
      </div>
    </div>
  )
}
