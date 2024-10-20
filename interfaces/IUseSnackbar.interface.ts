/* eslint-disable no-unused-vars */

import { ISnackbarState } from './ISnackbarState.interface'

import { ToastPosition, Colors } from '~/enums'

export interface IUseSnackbar {
  $open(color: Colors, message: string): void
  $close(): boolean
  $setTimeout(timeout: number): number
  $setPosition(x: ToastPosition, y: ToastPosition): string
  $snackbar: ISnackbarState
}
