/* eslint-disable indent */

import { ValidationRegexp, VValidation } from '~/utils'

import useVuelidate from '@vuelidate/core'

export async function useLoginForm($i18n: any) {
  const { rules, state } = new VValidation($i18n)
    .field('login')
      .required()
      .email()
      .maxLength(ValidationRegexp.LENGTH_50)
    .field('password')
      .required()
      .maxLength(ValidationRegexp.PASSWORD_MAX_LENGTH)

  const v$ = useVuelidate(rules, state)

  return {
    v$,
  }
}
