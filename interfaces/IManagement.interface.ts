import type { ManagementType } from '~/enums'

export interface IManagement {
  id?: string
  name: string
  date: string
  quantity: string
  price: number
  type: ManagementType
  is_gram: boolean
  is_kilogram: boolean
}
