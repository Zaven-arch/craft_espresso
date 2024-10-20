import type { IAdminActionButtonItem } from './IAdminActionButtonItem.interface'

export interface IAdminActionButtonConfig {
  toolbar?: IAdminActionButtonItem[] | Function
  card?: IAdminActionButtonItem[] | Function
  detail?: any
}
