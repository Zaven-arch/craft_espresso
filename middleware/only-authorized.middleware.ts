/* eslint-disable no-undef */

import { AuthService } from '~/services'

export default defineNuxtRouteMiddleware(async (_: any, from: any) => {
  const { check } = new AuthService()

  const localePath = useLocalePath()

  try {
    await check()
  } catch (e) {
    const { $i18n } = useNuxtApp()

    const reg = new RegExp(`^/${$i18n.locale.value}\\/?`)

    return localePath(`/login?rp=${from.fullPath.replace(reg, '')}`)
  }
})
