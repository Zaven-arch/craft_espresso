/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface IAdminExcelExportModalProps {
  modal: boolean
  loading: boolean
}

export type IEmits = {
  (e: 'close'): void
  (e: 'onDownload', value: any): void
}

export const defaultProps = {
  modal: false,
  loading: false,
}

export const useAdminExcelExportModalComponent = () => {
  const state = reactive({
    startDate: '',
    endDate: '',
  })

  return {
    state,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
