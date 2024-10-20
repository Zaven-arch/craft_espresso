/* eslint-disable no-undef */

import type { IUsePageLoading } from '~/interfaces'

const _loading: Ref<boolean> = ref(false)

export const usePageLoading = (value: boolean = false): IUsePageLoading => {
  const setLoading = (_value: boolean) => (_loading.value = _value)

  setLoading(value)

  return {
    loading: _loading,
    setLoading,
  }
}
