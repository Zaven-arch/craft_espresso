/* eslint-disable no-undef */

import type { ISnackbarState, IUseSnackbar } from '~/interfaces'

import { Colors, ToastPosition } from '~/enums'

import { $getColor } from '~/utils'

const state: ISnackbarState = reactive<ISnackbarState>({
  message: '',
  color: '',
  timeout: 3000,
  open: false,
  position: '',
  closeText: 'SNACKBAR.CLOSE',
})

export const useSnackbar = (): IUseSnackbar => {
  const $setPosition = (
    x: ToastPosition = ToastPosition.RIGHT,
    y: ToastPosition = ToastPosition.TOP,
  ): string => (state.position = `${x} ${y}`)

  if (!state.position) {
    $setPosition()
  }

  const $open = (color: Colors = Colors.RED, message: string = ''): void => {
    state.color = $getColor(color)
    state.message = message
    state.open = true
  }

  const $close = (): boolean => (state.open = false)
  const $setTimeout = (timeout: number): number => (state.timeout = timeout)

  return {
    $open,
    $close,
    $setTimeout,
    $setPosition,
    $snackbar: state,
  }
}
