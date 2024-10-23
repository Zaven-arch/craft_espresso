import type { IStaffPayload } from '~/interfaces'

import { BaseService } from './base.service'

export class StaffSettingsService extends BaseService {
  constructor() {
    super(null, true)

    this.transform = this.transform.bind(this)
    this.getStaffAccounts = this.getStaffAccounts.bind(this)
    this.create = this.create.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
  }

  private transform(data: any) {
    return data.users.map((user: any) => ({
      id: user.id,
      status: user.user_metadata.status,
      permission: user.user_metadata.role,
      email: user.email,
      lastLogin: user.last_sign_in_at,
    }))
  }

  async getStaffAccounts(query: any) {
    const { data, error } = await this.supabase.auth.admin.listUsers(query)

    const { data: dataCount, error: errorCount } = await this.supabase.auth.admin.listUsers()

    if (error || errorCount) {
      throw error
    }

    return {
      data: this.transform(data),
      total_page: Math.ceil(Number(dataCount) / query.perPage),
    }
  }

  async create(payload: IStaffPayload) {
    const { data, error } = await this.supabase.auth.admin.createUser(payload)

    if (error) {
      throw error
    }

    return data
  }

  async update(id: string, payload: Partial<IStaffPayload>) {
    const { data, error } = await this.supabase.auth.admin.updateUserById(
      id,
      payload,
    )

    if (error) {
      throw error
    }

    return data
  }

  async remove(id: string) {
    const { data, error } = await this.supabase.auth.admin.deleteUser(id)

    if (error) {
      throw error
    }

    return data
  }
}
