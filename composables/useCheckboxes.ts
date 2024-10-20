/* eslint-disable no-undef */

import type { IUseCheckboxes } from '~/interfaces'

export const useCheckboxes = (data: any[]): IUseCheckboxes => {
  const state: any = reactive({
    value: [],
    isAll: false,
  })

  watch(
    () => state.value,
    (value: string[]) => (state.isAll = value?.length === data.length),
  )

  const setToggle = (value: boolean) => (state.value = value ? data.map((item) => item.id) : [])

  return {
    state,
    setToggle,
  }
}
