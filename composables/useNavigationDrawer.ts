/* eslint-disable no-undef */

import { useBadge } from './useBadge'

import type {
  INavigationDrawer,
  INavigationDrawerItem,
  INavigationDrawerColors,
  IUseNavigationDrawer,
} from '~/interfaces'

const $drawer: INavigationDrawer = reactive<INavigationDrawer>({
  isOpen: false,
  color: {
    drawerColor: null,
    titleBackgroundColor: null,
    tabBackgroundColor: null,
    tabColor: null,
    sliderColor: null,
  },
  tab: null,
  top: [],
  bottom: [],
  badges: new Map(),
})

export const useNavigationDrawer = (): IUseNavigationDrawer => {
  const addBadgeMap = (data: INavigationDrawerItem[]) => data.forEach(
    ({ route }: INavigationDrawerItem) => $drawer.badges.set(route, useBadge()),
  )

  const open = (): boolean => ($drawer.isOpen = true)
  const close = (): boolean => ($drawer.isOpen = false)

  const setTopState = (state: INavigationDrawerItem[]): void => {
    $drawer.top = state

    addBadgeMap($drawer.top)
  }

  const setBottomState = (state: INavigationDrawerItem[]): void => {
    $drawer.bottom = state

    addBadgeMap($drawer.bottom)
  }

  const setColors = (
    colors: INavigationDrawerColors,
  ): INavigationDrawerColors => ($drawer.color = colors)

  const setTab = (tab: string): string => ($drawer.tab = tab)

  const setBadge = <T>(
    key: T,
    value: number,
  ): number | undefined => $drawer.badges.get(key)?.setContent(value)

  return {
    open,
    close,
    setTopState,
    setBottomState,
    setColors,
    setTab,
    setBadge,
    $drawer,
  }
}
