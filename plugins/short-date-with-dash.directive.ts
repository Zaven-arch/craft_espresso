import { DateFormat } from '~/enums'

import { $dateFormat } from '~/utils'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('short-date-with-dash', {
    mounted(el, { value }: any) {
      return $dateFormat.call(el, value, DateFormat.ShortWithDash)
    },
    getSSRProps() {
      return undefined
    },
  })
})
