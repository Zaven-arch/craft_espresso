/* eslint-disable no-undef */

import type { IUsePasswordField } from '~/interfaces'

import { IconType, InputType } from '~/enums'

export const usePasswordField = (): IUsePasswordField => {
  const show: Ref<boolean> = ref(false)

  const toggleShow = (): boolean => (show.value = !show.value)

  return {
    show,
    icon: computed<string>(() => (show.value ? IconType.EYE : IconType.EYE_OFF)),
    type: computed<string>(() => (show.value ? InputType.TEXT : InputType.PASSWORD)),
    toggleShow,
  }
}
