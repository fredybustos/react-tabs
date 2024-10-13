import React from 'react'
import styles from './styles.module.css'
import { TabProps, TabsProps, RenderTabs } from '../types/tabs'
import { Tab } from '../tab'
import useTabs from '../hooks/useTabs'
import { cleanObject } from '../utils'

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
    <div className={styles.tabs}>
      <div className={styles.tabs_tab_ctn}>
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
      <div className={`${className} ${styles.tabs_ctn}`} style={style}>
        {renderChildren[activeTab]}
      </div>
    </div>
  )
}
