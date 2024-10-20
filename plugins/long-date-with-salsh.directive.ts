import { DateFormat } from '~/enums'

import { $dateFormat } from '~/utils'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('long-date-with-slash', {
    mounted(el, { value }: any) {
      return $dateFormat.call(el, value, DateFormat.LongWithSlash)
    },
    getSSRProps() {
      return undefined
    },
  })
})
