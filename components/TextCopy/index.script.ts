/* eslint-disable no-undef */

export interface ITextCopyProps {
  text: string
  entry: string
  mobile: boolean
}

export const defaultProps = {
  text: '',
  entry: '',
  mobile: false,
}

export const useTextCopyComponent = () => ({
  ...useCopy(),
})
