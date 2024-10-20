/* eslint-disable no-undef */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import type {
  INavigationDrawerItem,
  IUseNavbar,
  IUseNavigationDrawer,
} from '~/interfaces'

import { navbarConfig, navigationDrawerConfig } from '~/configs'

export const useDefaultLayout = async () => {
  const { setNavbar, setColors: setNavbarColors }: IUseNavbar = useNavbar()

  const {
    setTopState, setBottomState, setColors, open,
  }: IUseNavigationDrawer = useNavigationDrawer()

  setNavbar(navbarConfig)
  setNavbarColors({
    sliderColor: $getColor(Colors.PRIMARY_RED),
    tabColor: $getColor(Colors.PRIMARY_RED),
  })

  const _icons = Object.fromEntries(
    await Promise.all(
      Object.entries(
        import.meta.glob('~/assets/svg/Drawer/*.svg', { as: 'raw' }),
      ).map(async ([key, value]) => [
        key.split('/').pop()!.split('.').shift(),
        await value(),
      ]),
    ),
  )

  setTopState(
    navigationDrawerConfig.top.map((item: INavigationDrawerItem) => ({
      ...item,
      icon: _icons[item.icon],
    })),
  )
  setBottomState(
    navigationDrawerConfig.bottom.map((item: INavigationDrawerItem) => ({
      ...item,
      icon: _icons[item.icon],
    })),
  )
  setColors({
    drawerColor: $getColor(Colors.PRIMARY_BLACK),
    titleBackgroundColor: $getColor(Colors.PRIMARY_BLACK),
    tabBackgroundColor: $getColor(Colors.PRIMARY_BLACK),
    tabColor: $getColor(Colors.PRIMARY_RED_OPACITY),
    sliderColor: $getColor(Colors.PRIMARY_RED),
  })

  open()

  return {
    color: $getColor(Colors.PAGE_BACKGROUND),
  }
}
