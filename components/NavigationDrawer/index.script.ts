/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import type {
  IUsePageLoading,
  IUseNavigationDrawer,
  INavigationDrawerItem,
} from '~/interfaces'

import { $getPath } from '~/utils'

export interface INavigationDrawerProps {
  permanent: boolean
  logoSrc: string
  logoutLoading: boolean
}

export type IEmits = (e: 'onLogout') => void

export const defaultProps = {
  permanent: false,
  logoSrc: '',
  logoutLoading: false,
}

export const useNavigationDrawerComponent = () => {
  const localePath = useLocalePath()

  const { $drawer }: IUseNavigationDrawer = useNavigationDrawer()
  const { loading }: IUsePageLoading = usePageLoading()

  const changePathHandler = (route: string = '', _loading: boolean = false) => {
    $drawer.top.forEach((item: INavigationDrawerItem) => {
      const result = route === localePath($getPath(item.route))

      item.loading = _loading && !result
      item.current = _loading && result
    })

    $drawer.bottom.forEach((item: INavigationDrawerItem) => {
      const result = route === localePath($getPath(item.route))

      item.loading = _loading && !result
      item.current = _loading && result
    })
  }

  watch(loading, (value) => !value && changePathHandler())

  return {
    $drawer,
  }
}
