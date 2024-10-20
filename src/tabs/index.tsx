import React from 'react'
import { TabsProps, RenderTabs, TabComponentProps } from '../types'
import { TabComponent } from '../tab'
import useTabs from '../hooks/useTabs'
import { cleanObject } from '../utils'
import './tabs.css'

const renderTab = ({ child, index, activeTab, activeStyles, onTabActive }: RenderTabs) => {
  const { title, disabled, hideTab, style, className, active, icon, rightIcon } = child.props
  return (
    <TabComponent
      key={index}
      title={title}
      icon={icon}
      style={style}
      hideTab={hideTab}
      disabled={disabled}
      rightIcon={rightIcon}
      className={className}
      activeStyles={activeStyles}
      active={index === activeTab}
      onClick={() =>
        onTabActive({
          index,
          element: {
            title,
            disabled,
            hideTab,
            style,
            className,
            rightIcon,
            active,
            icon,
            children: undefined,
          },
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

  const setActiveTab = (arg: { index: number; element: TabComponentProps }) => {
    onTabActive(arg.index)
    onSelect?.({ index: arg.index, element: cleanObject({ ...arg.element }) })
  }

  return (
    <div className="rc-tabs">
      <div className="rc-tabs_tab_ctn">
        {childTabs.map((child, index) => {
          const { title, disabled, hideTab, style, className, active, icon, rightIcon } =
            child.props
          return renderTab({
            activeStyles,
            activeTab,
            child,
            index,
            icon,
            onTabActive: () =>
              setActiveTab({
                index,
                element: {
                  className,
                  rightIcon,
                  disabled,
                  hideTab,
                  active,
                  icon,
                  title,
                  style,
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
