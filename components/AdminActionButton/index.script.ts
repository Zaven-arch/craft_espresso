/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import type { IAdminActionButtonItem } from '~/interfaces'

export interface IAdminActionButtonProps {
  id: string
  large: boolean
  block: boolean
  minWidth: string | number
  items: IAdminActionButtonItem[]
}

export type IEmits = (event: 'onChange', value: string, id: string) => void

export const defaultProps = {
  id: '',
  items: () => [],
  large: false,
  block: false,
  minWidth: 200,
}

export const useAdminActionButtonComponent = (
  { id }: IAdminActionButtonProps,
  emits: IEmits,
) => {
  const action: Ref<string> = ref('')

  const onChangeHandler = ([value]: string[]): void => {
    emits('onChange', value, id)

    nextTick(() => (action.value = ''))
  }

  return {
    action,
    color: $getColor(Colors.PRIMARY_RED),
    onChangeHandler,
  }
}
