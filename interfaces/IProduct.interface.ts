import { ProductType, Status } from '~/enums'

import type { IProductDetail } from './IProductDetail.interface'

export interface IProduct {
  id?: string
  name: string
  image: string
  small_price: number
  big_price: number
  type: ProductType
  small_details?: IProductDetail[]
  big_details?: IProductDetail[]
  status: Extract<Status, Status.DISABLE | Status.ENABLE>
}
