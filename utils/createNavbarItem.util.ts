/* eslint-disable func-names */

import type { INavbarItem } from '~/interfaces'

export default function (
  name: string,
  route: string,
  drawerTab: string,
): INavbarItem {
  return { name, route, drawerTab }
}
