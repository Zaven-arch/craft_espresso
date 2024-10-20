/* eslint-disable no-undef */

import type { IUseNavbar, INavbarColors, INavbar } from '~/interfaces'

const $navbar: INavbar = reactive<INavbar>({
  data: null,
  tab: null,
  color: {
    sliderColor: null,
    tabColor: null,
  },
})

export const useNavbar = (): IUseNavbar => {
  const setNavbar = (data: any): any => ($navbar.data = data)
  const setTab = (value: number): number => ($navbar.tab = value)
  const setColors = (colors: INavbarColors): INavbarColors => ($navbar.color = colors)

  return {
    $navbar,
    setNavbar,
    setColors,
    setTab,
  }
}
