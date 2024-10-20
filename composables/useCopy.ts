/* eslint-disable no-undef */

import type { IUseCopy } from '~/interfaces'

export const useCopy = (): IUseCopy => {
  const isCopied: Ref<boolean> = ref(false)

  const icon: ComputedRef<string> = computed<string>(() => (isCopied.value
    ? 'mdi-clipboard-check-multiple-outline'
    : 'mdi-content-copy'))

  const doCopy = async (data: string) => {
    if (isCopied.value) {
      return false
    }

    await window?.navigator?.clipboard.writeText(data)

    isCopied.value = true

    setTimeout(() => {
      isCopied.value = false
    }, 1000)
  }

  return {
    doCopy,
    icon,
    isCopied,
  }
}
