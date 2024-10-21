/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { SupabaseClient, createClient } from '@supabase/supabase-js'

import { DBTable } from '~/enums'

export class BaseService {
  protected TABLE: DBTable | null = null

  protected dbUrl: string

  protected supabaseKey: string

  protected supabase: SupabaseClient

  constructor(table: DBTable | null) {
    const {
      public: { dbUrl, supabaseKey },
    } = useRuntimeConfig()

    this.dbUrl = dbUrl
    this.supabaseKey = supabaseKey
    this.supabase = createClient(this.dbUrl, this.supabaseKey)

    this.TABLE = table
  }

  protected getRequestQuery(_filters?: any, _pagination: boolean = false) {
    throw new Error('Not implemented!')
  }

  protected async pagination(filters?: any) {
    const { count }: any = await this.getRequestQuery(filters, true)

    return {
      total: Math.ceil(Number(count) / filters.limit),
      from: (filters.page - 1) * filters.limit,
      to: filters.page * filters.limit - 1,
      count,
    }
  }
}
