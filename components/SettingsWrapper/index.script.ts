/* eslint-disable no-unused-vars */

export interface ISettingsWrapperProps {
  loading: boolean
  buttonColor: string
  contentClass: string
  buttonClass: string
  buttonBlockWidth: string | number
}

export type IEmits = (e: 'onSubmit') => void

export const defaultProps = {
  loading: false,
  buttonColor: '',
  contentClass: '',
  buttonClass: '',
  buttonBlockWidth: '',
}
