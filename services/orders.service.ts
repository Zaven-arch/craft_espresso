import * as XLSX from 'xlsx'

import { DateFormat, DBTable } from '~/enums'

import { $numberFormat } from '~/utils'

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
    this.download = this.download.bind(this)
  }

  private transform(data: any) {
    return data.map((order: any) => ({
      id: order.id,
      price: order.price,
      order: order.order,
      status: order.status,
      is_paid: order.is_paid,
      payment_method: order.payment_method,
      memo: order.memo,
      products: order.order_products.map((item: any) => {
        item.products.small_count = item.small_count
        item.products.big_count = item.big_count

        return item.products
      }),
    }))
  }

  private async getXlsx(data: any[], filters?: any) {
    const preparedDataOrdersProducts: any[] = []

    const preparedDataOrders = data.map((item: any) => {
      item.products.forEach((product: any) => {
        preparedDataOrdersProducts.push({
          ID: product.id,
          Order: item.order,
          Name: product.name,
          'Small Price': $numberFormat(product.small_price),
          'Small Count': $numberFormat(product.small_count),
          'Big Price': $numberFormat(product.big_price),
          'Big Count': $numberFormat(product.big_count),
        })
      })

      return {
        ID: item.id,
        Status: item.status,
        Price: $numberFormat(item.price),
        'Payment Method': item.payment_method,
        Order: item.order,
        'Is Paid': item.is_paid,
        'Admin memo': item.memo,
      }
    })

    const resultData = [
      {
        'Start Date': filters?.startDate
          ? $dateFormat(filters.startDate, DateFormat.LongWithSlash)
          : 'All Period',
        'End Date': $dateFormat(
          filters?.endDate || new Date().toISOString(),
          DateFormat.LongWithSlash,
        ),
        Result: $numberFormat(
          data.reduce((sum: number, order: any) => sum + order.price || 0, 0),
        ),
      },
    ]

    // Convert the data to worksheet format
    const worksheetOrders = XLSX.utils.json_to_sheet(preparedDataOrders)
    const worksheetOrdersProducts = XLSX.utils.json_to_sheet(
      preparedDataOrdersProducts,
    )
    const worksheetResult = XLSX.utils.json_to_sheet(resultData)

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheetOrders, 'Orders')
    XLSX.utils.book_append_sheet(
      workbook,
      worksheetOrdersProducts,
      "Order's Products",
    )
    XLSX.utils.book_append_sheet(workbook, worksheetResult, 'Results')

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `orders_${Date.now()}.xlsx`)
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

    if (filters?.startDate) {
      req.gte('created_at', filters?.startDate)
    }

    if (filters?.endDate) {
      req.lte('created_at', filters?.endDate)
    }

    req.order('created_at', { ascending: false })

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

  async download(filters: any) {
    const { data, error } = await this.getRequestQuery(filters)

    if (error) {
      throw error
    }

    await this.getXlsx(this.transform(data), filters)

    return true
  }
}
