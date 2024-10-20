import React from 'react'

export type TabComponentProps = {
  title: string
  active?: boolean
  testId?: string
  rightIcon?: boolean
  onClick?: () => void
  disabled?: boolean
  hideTab?: boolean
  icon?: React.ReactNode | string
  className?: string
  style?: React.CSSProperties
  activeStyles?: Styles
  children?: React.ReactNode | string
}

export type TabProps = {
  title: string
  active?: boolean
  testId?: string
  disabled?: boolean
  rightIcon?: boolean
  hideTab?: boolean
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode | string
  icon?: React.ReactNode | string
}

export type TabsProps = {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[]
  className?: string
  style?: React.CSSProperties
  activeStyles?: Styles
  onSelect?: (arg: { index: number; element: Partial<TabProps> }) => void
}

export type RenderTabs = {
  child: React.ReactElement<TabComponentProps>
  index: number
  activeTab: number
  style?: React.CSSProperties
  activeStyles?: Styles
  icon?: React.ReactNode | string
  onTabActive: (arg: { index: number; element: TabProps }) => void
}

type Styles = {
  style?: React.CSSProperties
  className?: string
}
