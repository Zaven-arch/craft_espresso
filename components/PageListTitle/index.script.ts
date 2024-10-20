/* eslint-disable no-unused-vars */

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface IPageListTitleProps {
  checkboxState: any
  disabled: boolean
  titleOnly: boolean
  indeterminate: boolean
  minWidth: number | string
  checkboxClass: string
}

export type IEmits = (e: 'onCheckboxChange', value: any) => void

export const defaultProps = {
  checkboxState: () => ({}),
  disabled: false,
  titleOnly: false,
  indeterminate: false,
  minWidth: '',
  checkboxClass: '',
}

export const usePageListTitleComponent = () => ({
  bgColor: $getColor(Colors.LIGHT_BLUE),
  checkboxColor: $getColor(Colors.ACTIVE_TAB_PRIMARY),
})
