import { $createNavbarItem } from '../utils'

import { NavigationDrawerRoute } from '../enums'

export default {
  [NavigationDrawerRoute.CASHBOX]: [
    $createNavbarItem('NAVBAR.CASHBOX', 'root', NavigationDrawerRoute.CASHBOX),
  ],
  [NavigationDrawerRoute.ORDERS]: [
    $createNavbarItem('NAVBAR.ORDERS', 'orders', NavigationDrawerRoute.ORDERS),
    $createNavbarItem(
      'NAVBAR.ORDERS_WAIT',
      'orders/wait',
      NavigationDrawerRoute.ORDERS,
    ),
    $createNavbarItem(
      'NAVBAR.ORDERS_DONE',
      'orders/done',
      NavigationDrawerRoute.ORDERS,
    ),
  ],
  [NavigationDrawerRoute.PRODUCTS]: [
    $createNavbarItem(
      'NAVBAR.PRODUCTS',
      'products',
      NavigationDrawerRoute.PRODUCTS,
    ),
    $createNavbarItem(
      'NAVBAR.PRODUCTS_COFFEE',
      'products/coffee',
      NavigationDrawerRoute.PRODUCTS,
    ),
    $createNavbarItem(
      'NAVBAR.PRODUCTS_TEA',
      'products/tea',
      NavigationDrawerRoute.PRODUCTS,
    ),
    $createNavbarItem(
      'NAVBAR.PRODUCTS_FRESH',
      'products/fresh',
      NavigationDrawerRoute.PRODUCTS,
    ),
    $createNavbarItem(
      'NAVBAR.PRODUCTS_OTHER',
      'products/other',
      NavigationDrawerRoute.PRODUCTS,
    ),
  ],
  [NavigationDrawerRoute.MANAGEMENT]: [
    $createNavbarItem(
      'NAVBAR.MANAGEMENT',
      'management',
      NavigationDrawerRoute.MANAGEMENT,
    ),
    $createNavbarItem(
      'NAVBAR.MANAGEMENT_INPUT',
      'management/input',
      NavigationDrawerRoute.MANAGEMENT,
    ),
    $createNavbarItem(
      'NAVBAR.MANAGEMENT_OUTPUT',
      'management/output',
      NavigationDrawerRoute.MANAGEMENT,
    ),
  ],
  [NavigationDrawerRoute.SETTINGS]: [
    $createNavbarItem(
      'NAVBAR.SETTINGS',
      'settings',
      NavigationDrawerRoute.SETTINGS,
    ),
    $createNavbarItem(
      'NAVBAR.STAFF_ACCOUNT',
      'settings/staff',
      NavigationDrawerRoute.SETTINGS,
    ),
  ],
}
