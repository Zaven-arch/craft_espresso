import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import { useLoginForm } from '~/validation'

export const useLoginPage = async () => {
  const $i18n = useI18n()

  return {
    ...useLogin(),
    ...usePasswordField(),
    ...(await useLoginForm($i18n)),
    color: $getColor(Colors.PRIMARY_RED),
  }
}
