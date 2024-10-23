/* eslint-disable no-unused-vars */

import { ToastPosition, Colors } from '~/enums'
import type{ ISnackbarState } from './ISnackbarState.interface'

export interface IUseSnackbar {
  $open(color: Colors, message: string): void
  $close(): boolean
  $setTimeout(timeout: number): number
  $setPosition(x: ToastPosition, y: ToastPosition): string
  $snackbar: ISnackbarState
}
