import { NuxtI18nOptions } from '@nuxtjs/i18n/dist/module'

import { I18nLocales } from '../constants'

export default {
  strategy: 'prefix',
  baseURL: process.env.APP_URL,
  locales: [I18nLocales.ENGLISH, I18nLocales.ARMENIAN],
  defaultLocale: 'en',
  lazy: true,
  langDir: 'locales/',
} as NuxtI18nOptions
