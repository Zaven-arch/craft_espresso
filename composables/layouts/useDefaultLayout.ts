/* eslint-disable no-undef */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import type {
  INavigationDrawerItem,
  IUseLogout,
  IUseNavbar,
  IUseNavigationDrawer,
} from '~/interfaces'

import {
  navbarConfig as _navbarConfig,
  navigationDrawerConfig as _navigationDrawerConfig,
} from '~/configs'

import { AuthService } from '~/services'

import { staffAccountLimits } from '~/constants'

export const useDefaultLayout = async () => {
  const {
    URLS, SIDEBAR, RE_WRITE_URL,
  } = staffAccountLimits[AuthService.user?.user_metadata?.role] ?? {}

  const navbarConfig = Object.fromEntries(
    Object.entries(_navbarConfig)
      .filter(([key]: any[]) => !SIDEBAR?.includes(key))
      .map(([key, value]: any[]) => [
        key,
        value.filter(({ route }: any) => !URLS?.includes(route)),
      ]),
  )

  const navigationDrawerConfig = Object.fromEntries(
    Object.entries(_navigationDrawerConfig).map(([key, value]) => [
      key,
      value
        .filter(({ route }: any) => !SIDEBAR?.includes(route))
        .map((item) => {
          if (RE_WRITE_URL?.[item.route]) {
            item.route = RE_WRITE_URL?.[item.route]
          }

          return item
        }),
    ]),
  )

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

  const { loading: logoutLoading, logout }: IUseLogout = useLogout()

  const { logout: _logout } = new AuthService()

  const { goTo } = useAppRouter()

  const onLogoutHandler = () => logout(() => {
    _logout()

    goTo('/login')
  })

  return {
    logoutLoading,
    onLogoutHandler,
    color: $getColor(Colors.PAGE_BACKGROUND),
  }
}
