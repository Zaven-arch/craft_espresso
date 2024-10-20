/* eslint-disable func-names */

import type { INavigationDrawerItem } from '~/interfaces'

export default function (
  name: string,
  route: string,
  icon: string,
): INavigationDrawerItem {
  return {
    name,
    icon,
    route,
    loading: false,
    current: false,
  }
}
