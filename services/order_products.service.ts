import { DBTable } from '~/enums'

import type { IOrderProducts } from '~/interfaces'

import { BaseService } from './base.service'

export class OrderProductsService extends BaseService {
  constructor() {
    super(DBTable.ORDER_PRODUCTS)

    this.create = this.create.bind(this)
  }

  async create(payload: IOrderProducts[]) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .insert(payload)
      .select()

    if (error) {
      throw error
    }

    return data
  }
}
