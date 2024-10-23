import type { ILoginPayload } from '~/interfaces'

import { Status } from '~/enums'

import { BaseService } from './base.service'

export class AuthService extends BaseService {
  static user: any = null

  constructor() {
    super(null)

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.check = this.check.bind(this)
    this.checkIsActive = this.checkIsActive.bind(this)
  }

  async login(payload: ILoginPayload) {
    const { data, error } = await this.supabase.auth.signInWithPassword(payload)

    if (error) {
      throw error
    }

    await this.checkIsActive()

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

    AuthService.user = data?.session?.user

    return data
  }

  private async checkIsActive() {
    const { data, error } = await this.supabase.auth.getUser()

    if (error) {
      throw error
    }

    if (data.user?.user_metadata?.status === Status.DISABLE) {
      this.logout()

      throw new Error('User cannot sign in!')
    }

    return data
  }
}
