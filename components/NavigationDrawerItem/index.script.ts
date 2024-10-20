/* eslint-disable no-undef */

import type { IUseNavigationDrawer } from '~/interfaces'

import { $getPath } from '~/utils'

export interface INavigationDrawerItemProps {
  hasLimitation: boolean
  current: boolean
  loading: boolean
  icon: string
  name: string
  route: string
}

export const defaultProps = {
  hasLimitation: false,
  current: false,
  loading: false,
  icon: '',
  name: '',
  route: '',
}

export const useNavigationDrawerItemComponent = () => {
  const { $drawer, setTab }: IUseNavigationDrawer = useNavigationDrawer()

  return {
    $drawer,
    setTab,
    $getPath,
  }
}
