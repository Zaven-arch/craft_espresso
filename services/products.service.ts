import { DBTable } from '~/enums'

import type { IProduct } from '~/interfaces'

import { BaseService } from './base.service'
import { UploadService } from './upload.service'

export class ProductsService extends BaseService {
  constructor() {
    super(DBTable.PRODUCTS)

    this.getRequestQuery = this.getRequestQuery.bind(this)
    this.pagination = this.pagination.bind(this)

    this.getList = this.getList.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  override getRequestQuery(filters?: any, pagination: boolean = false) {
    const req = this.supabase
      .from(this.TABLE as string)
      .select('*', pagination ? { count: 'exact', head: true } : undefined)

    if (filters?.like) {
      req.ilike('name', `%${filters?.like}%`)
    }

    if (filters?.status) {
      req.eq('status', filters?.status)
    }

    if (filters?.type) {
      req.eq('type', filters?.type)
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
      data,
      total_page: totalPage,
    }
  }

  async getById(id: string, filters?: any) {
    const req = this.getRequestQuery(filters)

    const { data, error } = await req.eq('id', id).single()

    if (error) {
      throw error
    }

    return data
  }

  async create(payload: IProduct) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .insert([payload])
      .select()

    if (error) {
      throw error
    }

    return data
  }

  async update(payload: IProduct) {
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
    const { remove: removeFile } = new UploadService()

    const product = await this.getById(id)

    await removeFile(product.image)

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
