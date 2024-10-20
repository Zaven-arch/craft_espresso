import { $numberFormat } from '~/utils'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('number-format', {
    mounted(el, { value, arg }: any) {
      return $numberFormat.call(el, value, arg)
    },
    getSSRProps() {
      return undefined
    },
  })
})
