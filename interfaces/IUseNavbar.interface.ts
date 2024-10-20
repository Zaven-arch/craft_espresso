/* eslint-disable no-unused-vars */

import { INavbar } from './INavbar.interface'
import { INavbarColors } from './INavbarColors.interface'

export interface IUseNavbar {
  $navbar: INavbar
  setNavbar(data: any): any
  setTab(tab: number | string): number | string
  setColors(colors: INavbarColors): INavbarColors
}
