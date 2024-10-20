import { DBTable } from '~/enums'

import type { IManagement } from '~/interfaces'

import { BaseService } from './base.service'

export class ManagementService extends BaseService {
  constructor() {
    super(DBTable.MANAGEMENT)

    this.getRequestQuery = this.getRequestQuery.bind(this)
    this.pagination = this.pagination.bind(this)

    this.getList = this.getList.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }

  override getRequestQuery(filters?: any, pagination: boolean = false) {
    const req = this.supabase
      .from(this.TABLE as string)
      .select('*', pagination ? { count: 'exact', head: true } : undefined)

    if (filters?.like) {
      req.ilike('name', `%${filters?.like}%`)
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

  async create(payload: IManagement) {
    const { data, error } = await this.supabase
      .from(this.TABLE as string)
      .insert([payload])
      .select()

    if (error) {
      throw error
    }

    return data
  }

  async update(payload: IManagement) {
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
}
