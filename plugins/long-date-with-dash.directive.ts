import { DateFormat } from '~/enums'

import { $dateFormat } from '~/utils'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('long-date-with-dash', {
    mounted(el, { value }: any) {
      return $dateFormat.call(el, value, DateFormat.LongWithDash)
    },
    getSSRProps() {
      return undefined
    },
  })
})
