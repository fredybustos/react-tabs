import React from 'react'
import { TabProps } from '../types/tabs'
import styles from './styles.module.css'

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
  const mergedClassName = active ? `${styles.active} ${activeStyles.className}` : className

  return (
    <button
      role="tab"
      onClick={onClick}
      disabled={disabled}
      style={mergedStyles}
      aria-selected={active}
      data-testid={`tab-${testId}`}
      aria-controls={`panel-${testId}`}
      className={`${styles.tab} ${mergedClassName}`}
    >
      {title}
    </button>
  )
}
