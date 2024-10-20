/* eslint-disable no-undef */

import type { IUseModalWindow } from '~/interfaces'

export const useModalWindow = (): IUseModalWindow => {
  const isOpen: Ref<boolean> = ref<boolean>(false)

  const open = (): boolean => (isOpen.value = true)
  const close = (): boolean => (isOpen.value = false)

  return {
    isOpen,
    open,
    close,
  }
}
