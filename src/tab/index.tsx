import React from 'react'
import { TabProps } from '../types'
import './tab.css'

export const Tab = ({
  onClick,
  hideTab,
  title,
  active,
  disabled,
  style = {},
  className = '',
  testId = 'testid',
  activeStyles = { style: {}, className: '' },
}: TabProps) => {
  if (hideTab) return null
  const mergedStyles = active ? { ...style, ...activeStyles.style } : style
  const mergedClassName = active ? `rc-tab_active ${activeStyles.className}` : className

  return (
    <button
      role="tab"
      onClick={onClick}
      disabled={disabled}
      style={mergedStyles}
      aria-selected={active}
      data-testid={`tab-${testId}`}
      aria-controls={`panel-${testId}`}
      className={`rc-tab ${mergedClassName}`}
    >
      {title}
    </button>
  )
}
