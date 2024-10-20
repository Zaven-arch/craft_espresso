/* eslint-disable no-undef */

import type { IUsePagination } from '~/interfaces'

export const usePagination = (value = 1): IUsePagination => {
  const page: Ref<number> = ref(value)

  const pageHandler = (cb: Function): any => watch(
    () => page.value,
    (_value: number, oldValue: number) => cb(_value, oldValue),
  )

  return {
    page,
    pageHandler,
  }
}
