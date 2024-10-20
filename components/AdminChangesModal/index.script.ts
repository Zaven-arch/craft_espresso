/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { $getColor } from '~/utils'

import { Colors } from '~/enums'

export interface IAdminChangesModalProps {
  modal: boolean
  loading: boolean
  selected: string
  items: any[]
}

export type IEmits = {
  (e: 'close'): void
  (e: 'onChange', value: string): void
}

export const defaultProps = {
  modal: false,
  loading: false,
  selected: '',
  items: () => [],
}

export const useAdminChangesModalComponent = ({
  selected,
}: IAdminChangesModalProps) => {
  const radio: Ref<string> = ref<string>('')

  if (selected) {
    radio.value = selected
  }

  return {
    radio,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
