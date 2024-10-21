/* eslint-disable no-undef */

import { useRoute } from 'nuxt/app'

import { useDisplay } from 'vuetify'

import { $getPath } from '~/utils'

import type { IUseNavigationDrawer, IUseNavbar, INavbarItem } from '~/interfaces'

export const useNavbarComponent = () => {
  const localePath = useLocalePath()

  const $route = useRoute()

  const { xs } = useDisplay()

  const { $drawer, setTab, open }: IUseNavigationDrawer = useNavigationDrawer()

  const { $navbar, setTab: setNavbarTab }: IUseNavbar = useNavbar()

  const items: INavbarItem[] = $navbar.data[$route.path.split('/')[2]] ?? $navbar.data.root

  const item: INavbarItem | null | undefined = items?.find(
    (_item: INavbarItem) => $route.path.startsWith(localePath($getPath(_item.route))),
  )

  item?.drawerTab && setTab(localePath($getPath(item.drawerTab)))

  const tabs: ComputedRef<INavbarItem[]> = computed<INavbarItem[]>(
    () => $navbar.data[$drawer.tab?.toString().split('/')[2] || 'root'],
  )

  const isRight = computed(() => xs.value && tabs.value.length > 2)

  watch(
    () => $drawer.tab,
    () => setNavbarTab(localePath($getPath(tabs.value[0].route))),
  )

  return {
    open,
    tabs,
    isRight,
    $navbar,
    setNavbarTab,
    $getPath,
  }
}
