/* eslint-disable indent */

import useVuelidate from '@vuelidate/core'

import { ValidationRegexp, VValidation } from '~/utils'

export async function useAccountForm($i18n: any) {
  const { rules, state } = new VValidation($i18n)
    .field('email')
      .required()
      .email()
      .maxLength(ValidationRegexp.LENGTH_50)
    .field('password')
      .required()
      .minLength(ValidationRegexp.PASSWORD_MIN_LENGTH, ({ $model }: any) => $i18n.t('VALIDATORS.PASSWORD', {
        min: ValidationRegexp.PASSWORD_MIN_LENGTH,
        count: $model?.length,
      }))
      .maxLength(ValidationRegexp.PASSWORD_MAX_LENGTH)
      .custom(
        'passwordNumeric',
        ValidationRegexp.PASSWORD_NUMERIC,
        $i18n.t('VALIDATORS.PASSWORD_NUMERIC'),
      )
      .custom(
        'passwordSymbol',
        ValidationRegexp.PASSWORD_SYMBOL,
        $i18n.t('VALIDATORS.PASSWORD_SPEC_SYMBOL', {
          symbols:
            '^ $ * . { } ( ) ? " ! @ # % & / \\ , > < \' : ; | _ ~ ` = + -',
        }),
      )
    .field('confirmPassword')
      .required()
      .sameAs(null, 'password', $i18n.t('VALIDATORS.PASSWORD_NOT_MATCH'))
    .field('status')
      .required()
    .field('permission')
      .required()

  const v$ = useVuelidate(rules, state)

  return {
    v$,
  }
}
