import { $createNavigationDrawerItem } from '../utils'

import type { INavigationDrawerItem } from '../interfaces'

import { NavigationDrawerRoute } from '../enums'

export default {
  top: [
    $createNavigationDrawerItem(
      'SIDEBAR.CASHBOX',
      NavigationDrawerRoute.CASHBOX,
      'cashboxIcon',
    ),
    $createNavigationDrawerItem(
      'SIDEBAR.ORDERS',
      NavigationDrawerRoute.ORDERS,
      'ordersIcon',
    ),
    $createNavigationDrawerItem(
      'SIDEBAR.PRODUCTS',
      NavigationDrawerRoute.PRODUCTS,
      'productsIcon',
    ),
    $createNavigationDrawerItem(
      'SIDEBAR.MANAGEMENT',
      NavigationDrawerRoute.MANAGEMENT,
      'managementIcon',
    ),
  ],
  bottom: [
    $createNavigationDrawerItem(
      'SIDEBAR.SETTINGS',
      NavigationDrawerRoute.SETTINGS,
      'settingsIcon',
    ),
  ],
} as { top: INavigationDrawerItem[]; bottom: INavigationDrawerItem[] }
