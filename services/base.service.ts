/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { SupabaseClient, createClient } from '@supabase/supabase-js'

import type { RuntimeConfig } from 'nuxt/schema'

import { DBTable } from '~/enums'

export class BaseService {
  protected TABLE: DBTable | null = null

  protected dbUrl: string

  protected supabase: SupabaseClient

  constructor(table: DBTable | null, isAdmin?: boolean) {
    const {
      public: { dbUrl, supabaseKey, supabaseServiceKey },
    }: RuntimeConfig = useRuntimeConfig()

    this.dbUrl = dbUrl
    this.supabase = createClient(
      this.dbUrl,
      (isAdmin ? supabaseServiceKey : supabaseKey) as string,
    )

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
