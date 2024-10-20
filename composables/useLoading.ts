/* eslint-disable no-undef */

import type { IUseLoading } from '~/interfaces'

export const useLoading = (value: boolean = false): IUseLoading => {
  const loading: Ref<boolean> = ref<boolean>(false)

  const setLoading = (_value: boolean) => (loading.value = _value)

  setLoading(value)

  return {
    loading,
    setLoading,
  }
}
