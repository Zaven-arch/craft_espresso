/* eslint-disable no-undef */

import { AuthService } from '~/services'

export default defineNuxtRouteMiddleware(async () => {
  const { check } = new AuthService()

  const localePath = useLocalePath()

  try {
    await check()

    return localePath('/')
  } catch (e) {}
})
