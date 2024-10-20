/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import type { IAdminActionButtonItem } from '~/interfaces'

export interface IAdminToolbarProps {
  filter: boolean
  actions: boolean
  actionItems: IAdminActionButtonItem[]
}

export type IEmits = {
  (e: 'onFilter'): void
  (e: 'onAction', value: any): void
}

export const defaultProps = {
  actionItems: () => [],
  filter: false,
  actions: false,
}

export const useAdminToolbarComponent = () => ({
  color: $getColor(Colors.PRIMARY_RED),
})
