/* eslint-disable no-unused-vars */

import type { WritableComputedRef } from 'vue'
import { Colors } from '~/enums'

import type { IProductDetail } from '~/interfaces'

import { $getColor } from '~/utils'

export interface IProductDetailItemProps {
  modelValue: IProductDetail
  readonly: boolean
}

export type IEmits = {
  (e: 'update:modelValue', value: IProductDetail): void
  (e: 'onRemove', value: string | undefined): void
}

export const defaultProps = {
  readonly: true,
}

export const useProductDetailItemComponent = (
  { modelValue }: IProductDetailItemProps,
  emits: IEmits,
) => {
  const form: WritableComputedRef<IProductDetail> = computed({
    get() {
      return modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    },

  })

  const onGramHandler = () => (form.value.is_gram = !form.value.is_gram)

  return {
    form,
    onGramHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
