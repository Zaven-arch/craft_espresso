import { INavigationDrawerColors } from './INavigationDrawerColors.interface'
import { INavigationDrawerItem } from './INavigationDrawerItem.interface'
import { IUseBadge } from './IUseBadge.interface'

export interface INavigationDrawer {
  isOpen: boolean
  color: INavigationDrawerColors
  tab: string | number | null
  top: INavigationDrawerItem[]
  bottom: INavigationDrawerItem[]
  badges: Map<any, IUseBadge>
}
