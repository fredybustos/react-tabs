import React from 'react'
import { TabComponentProps, TabProps } from '../types'
import './tab.css'

export const TabComponent = ({
  onClick,
  hideTab,
  icon,
  title,
  active,
  disabled,
  rightIcon,
  style = {},
  className = '',
  testId = 'testid',
  activeStyles = { style: {}, className: '' },
}: TabComponentProps) => {
  if (hideTab) return null
  const mergedStyles = active ? { ...style, ...activeStyles.style } : style
  const mergedClassName = active ? `rc-tab_active ${activeStyles.className}` : className
  const isDisabledAttr = disabled ? 'true' : 'false'
  const iconClass = `rc-tab_icon ${rightIcon ? 'rc-tab_icon_right' : ''}`

  const IconComponent = icon ? (
    <div className={iconClass}>
      {icon} <span>{title}</span>
    </div>
  ) : (
    title
  )

  return (
    <div
      role="tab"
      onClick={onClick}
      style={mergedStyles}
      aria-selected={active}
      data-testid={`tab-${testId}`}
      data-disabled={isDisabledAttr}
      aria-controls={`panel-${testId}`}
      className={`rc-tab ${mergedClassName}`}
    >
      {IconComponent}
    </div>
  )
}
export const Tab = TabComponent as unknown as React.FC<TabProps>
