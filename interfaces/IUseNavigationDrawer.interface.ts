/* eslint-disable no-unused-vars */

import { INavigationDrawer } from './INavigationDrawer.interface'
import { INavigationDrawerColors } from './INavigationDrawerColors.interface'
import { INavigationDrawerItem } from './INavigationDrawerItem.interface'

export interface IUseNavigationDrawer {
  open(): boolean
  close(): boolean
  setTopState(state: INavigationDrawerItem[]): void
  setBottomState(state: INavigationDrawerItem[]): void
  setColors(colors: INavigationDrawerColors): INavigationDrawerColors
  setTab(tab: string): string
  setBadge<T>(key: T, value: number): number | undefined
  $drawer: INavigationDrawer
}
