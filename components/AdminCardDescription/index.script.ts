export interface IAdminCardDescriptionProps {
  outlined: boolean
  label: string
  rounded: string
  color: string
  textColor: string
  description: string
}

export const defaultProps = {
  outlined: false,
  label: '',
  rounded: 'lg',
  color: '',
  textColor: 'tw-text-app-gun-powder-light',
  description: '',
}
