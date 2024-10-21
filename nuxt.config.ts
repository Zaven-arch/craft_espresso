// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineNuxtConfig, type NuxtConfig } from 'nuxt/config'

import {
  buildConfig,
  cssConfig,
  i18nConfig,
  devServerConfig,
  importsConfig,
  modulesConfig,
  viteConfig,
  componentsConfig,
  svgoConfig,
  runtimeConfig,
} from './configs'

export default defineNuxtConfig({
  css: cssConfig,
  i18n: i18nConfig,
  modules: modulesConfig,
  imports: importsConfig,
  devServer: devServerConfig,
  build: buildConfig,
  vite: viteConfig,
  components: componentsConfig,
  runtimeConfig,
  devtools: {
    enabled: false,
  },
  svgo: svgoConfig,
  // target: 'static',
  ssr: false,
  mode: 'spa',
} as NuxtConfig)
