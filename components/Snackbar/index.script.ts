/* eslint-disable no-undef */

import type { IUseSnackbar } from '~/interfaces'

export const useSnackbarComponent = () => {
  const { $snackbar, $close }: IUseSnackbar = useSnackbar()

  return {
    $snackbar,
    $close,
  }
}
