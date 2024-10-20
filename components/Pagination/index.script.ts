/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface IPaginationProps {
  variant: string
  density: string
  size: string | number
  elevation: string | number
  color: string
  length: number
  totalVisible: number
  modelValue: number
  rounded: string | number | boolean
}

export type IEmits = (e: 'update:modelValue', value: number) => void

export const defaultProps = {
  color: $getColor(Colors.PRIMARY_RED),
  variant: 'outlined',
  density: 'comfortable',
  size: 'default',
  rounded: false,
  elevation: 0,
  modelValue: 0,
  length: 10,
  totalVisible: 10,
}

export const usePaginationComponent = (
  props: IPaginationProps,
  emits: IEmits,
) => {
  const { modelValue } = toRefs(props)

  const page: Ref<number> = ref<number>(modelValue.value || 1)

  watchEffect(() => {
    page.value = modelValue.value
  })

  watch(page, (value: number) => emits('update:modelValue', value))

  return {
    page,
  }
}
