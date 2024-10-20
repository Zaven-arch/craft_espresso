import { ActionButtonType } from '~/enums'

export interface IAdminActionButtonItem {
  name: string
  value: ActionButtonType
  disabled: boolean
}
