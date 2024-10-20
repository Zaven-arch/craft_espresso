/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface IAdminDeleteModalProps {
  modal: boolean
  loading: boolean
}

export type IEmits = {
  (e: 'close'): void
  (e: 'onDelete'): void
}

export const defaultProps = {
  modal: false,
  loading: false,
}

export const useAdminDeleteModalComponent = () => ({
  color: $getColor(Colors.PRIMARY_RED),
})
