import type { ILoginPayload } from '~/interfaces'

import { BaseService } from './base.service'

export class AuthService extends BaseService {
  constructor() {
    super(null)

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.check = this.check.bind(this)
  }

  async login(payload: ILoginPayload) {
    const { data, error } = await this.supabase.auth.signInWithPassword(payload)

    if (error) {
      throw error
    }
    console.log(data)

    return data
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut()

    if (error) {
      throw error
    }

    return { success: true }
  }

  async check() {
    const { data, error } = await this.supabase.auth.getSession()

    if (error) {
      throw error
    }

    if (!data.session) {
      throw new Error('Unauthorized')
    }

    return data
  }
}
