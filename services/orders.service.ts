import { DBTable, Status } from '~/enums'

import type { IOrder } from '~/interfaces'

import { BaseService } from './base.service'

export class OrdersService extends BaseService {
  constructor() {
    super(DBTable.ORDERS)

    this.transform = this.transform.bind(this)

    this.getRequestQuery = this.getRequestQuery.bind(this)
    this.pagination = this.pagination.bind(this)

    this.getList = this.getList.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  private transform(data: any) {
    return data.map((order: any) => ({
      id: order.id,
      price: order.price,
      order: order.order,
      status: order.status,
      is_paid: order.is_paid,
      memo: order.memo,
      products: order.order_products.map((item: any) => {
        item.products.small_count = item.small_count
        item.products.big_count = item.big_count

        return item.products
      }),
    }))
  }

  override getRequestQuery(filters?: any, pagination: boolean = false) {
    const req = this.supabase
      .from(this.TABLE as string)
      .select(
        '*, order_products (products (id,image,small_price,big_price,name), small_count,big_count)',
        pagination ? { count: 'exact', head: true } : undefined,
      )

    if (filters?.like) {
      req.ilike('order', `%${filters?.like}%`)
    }

    if (filters?.status) {
      req.eq('status', filters?.status)
    }

    if (filters?.isPaid) {
      req.eq('is_paid', filters?.isPaid)
    }

    req
      .order('created_at', { ascending: false })

    return req
  }

  async getList(filters?: any) {
    let totalPage: number = 0

    const req = this.getRequestQuery(filters)

    if (filters?.limit && filters?.page) {
      const { total, from, to } = await this.pagination(filters)

      totalPage = total

      req.limit(filters.limit).range(from, to)
    }

    const { data, error } = await req

    if (error) {
      throw error
    }

    return {
      data: this.transform(data),
      total_page: totalPage,
    }
  }

  async create(payload: IOrder) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .insert([payload])
      .select()

    if (error) {
      throw error
    }

    return data
  }

  async update(payload: IOrder) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .update(payload)
      .eq('id', payload.id)
      .select()

    if (error) {
      throw error
    }

    return data
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return data
  }
}
