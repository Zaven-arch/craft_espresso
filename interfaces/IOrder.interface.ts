import { PaymentMethod, Status } from '~/enums'

import type { TIsPaid } from '~/types'

export interface IOrder {
  id?:string
  price: number
  order: string
  status: Extract<Status, Status.DONE | Status.WAIT>
  is_paid: TIsPaid
  payment_method: PaymentMethod
}
