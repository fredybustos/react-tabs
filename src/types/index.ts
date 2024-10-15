import React from 'react'

export type TabProps = {
  title: React.ReactElement | string
  active?: boolean
  testId?: string
  onClick?: () => void
  disabled?: boolean
  hideTab?: boolean
  className?: string
  style?: React.CSSProperties
  activeStyles?: Styles
  children?: React.ReactNode | string
}

export type TabsProps = {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]
  className?: string
  style?: React.CSSProperties
  activeStyles?: Styles
  onSelect?: (arg: { index: number; element: Partial<TabProps> }) => void
}

export type RenderTabs = {
  child: React.ReactElement<TabProps>
  index: number
  activeTab: number
  style?: React.CSSProperties
  activeStyles?: Styles
  onTabActive: (arg: { index: number; element: TabProps }) => void
}

type Styles = {
  style?: React.CSSProperties
  className?: string
}
