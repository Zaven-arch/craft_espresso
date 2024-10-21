/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import type { ValidatorFn } from '@vuelidate/core'

import {
  helpers,
  required,
  requiredIf,
  and,
  sameAs,
  email,
  numeric,
  minLength,
  maxLength,
  url,
} from '@vuelidate/validators'

export class VValidation {
  private _rules: any = {}

  private _state: any = reactive({})

  private _activeProperty: string = ''

  constructor(private $i18n: any) {
    this._setActiveProperty = this._setActiveProperty.bind(this)

    this.field = this.field.bind(this)
    this.required = this.required.bind(this)
    this.email = this.email.bind(this)
    this.maxLength = this.maxLength.bind(this)
    this.minLength = this.minLength.bind(this)
    this.url = this.url.bind(this)
    this.numeric = this.numeric.bind(this)
    this.custom = this.custom.bind(this)
    this.sameAs = this.sameAs.bind(this)
    this.and = this.and.bind(this)
  }

  get rules() {
    return this._rules
  }

  get state() {
    return this._state
  }

  private _setActiveProperty(_property: string) {
    this._activeProperty = _property
  }

  field(property: string, value: any = '') {
    this._setActiveProperty(property)

    this._rules[this._activeProperty] = {}
    this._state[this._activeProperty] = value

    return this
  }

  required() {
    this._rules[this._activeProperty].required = helpers.withMessage(
      this.$i18n.t('VALIDATORS.REQUIRED'),
      required,
    )

    return this
  }

  requiredIf(
    prop:
      | string
      | boolean
      | Ref<boolean>
      | (() => boolean | Promise<boolean>) = () => false,
  ) {
    this._rules[this._activeProperty].requiredIf = requiredIf(prop)

    return this
  }

  email() {
    this._rules[this._activeProperty].email = helpers.withMessage(
      this.$i18n.t('VALIDATORS.EMAIL'),
      email,
    )

    return this
  }

  maxLength(max: number | Ref<number>) {
    this._rules[this._activeProperty].maxLength = helpers.withMessage(
      this.$i18n.t('VALIDATORS.MAX_LENGTH', {
        max,
      }),
      maxLength(max),
    )

    return this
  }

  minLength(min: number | Ref<number>, message?: any) {
    this._rules[this._activeProperty].maxLength = helpers.withMessage(
      message, // TODO: Enhancement in future
      minLength(min),
    )

    return this
  }

  url() {
    this._rules[this._activeProperty].url = helpers.withMessage(
      this.$i18n.t('VALIDATORS.URL'),
      url,
    )

    return this
  }

  numeric() {
    this._rules[this._activeProperty].numeric = helpers.withMessage(
      this.$i18n.t('VALIDATORS.ONLY_NUMBERS'),
      numeric,
    )

    return this
  }

  custom(validatorPropName: string, validator: ValidatorFn, message: string) {
    this._rules[this._activeProperty][validatorPropName] = helpers.withMessage(
      message,
      validator,
    )

    return this
  }

  sameAs<E = unknown>(equalTo: E | Ref<E>, key?: string, message: any = '') {
    const data = key ? (computed(() => this._state[key]) as E) : equalTo

    this._rules[this._activeProperty].sameAs = helpers.withMessage(
      message,
      sameAs(data),
    )

    return this
  }

  // TODO:
  and(validators: ValidatorFn[], message: any) {
    this._rules[this._activeProperty].and = helpers.withMessage(
      message,
      and(...validators),
    )

    return this
  }
}
