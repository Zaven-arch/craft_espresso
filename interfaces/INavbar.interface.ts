import { INavbarColors } from './INavbarColors.interface'

export interface INavbar {
  data: any
  tab: string | number | null
  color: INavbarColors
}
