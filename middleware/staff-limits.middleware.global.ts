/* eslint-disable no-undef */

import { UserRole } from '~/enums'

import { staffAccountLimits } from '~/constants'

import { AuthService } from '~/services'

export default defineNuxtRouteMiddleware(async (to: any) => {
  try {
    if (!AuthService.user) {
      const { check } = new AuthService()

      await check()
    }

    const role: UserRole = AuthService.user?.user_metadata?.role as UserRole

    if (role === UserRole.OWNER) {
      return true
    }

    const localePath = useLocalePath()

    const { URLS } = staffAccountLimits[role] ?? {}

    return !URLS?.map((url: string) => localePath(`/${url}`))?.includes(
      localePath(to.path),
    )
  } catch (e) {}
})
