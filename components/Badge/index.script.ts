export interface IBadgeProps {
  positionNone: boolean
  content: number
  color: string
  contentTransition: string
  offsetY: string | number
}

export const defaultProps = {
  positionNone: false,
  content: 0,
  color: '',
  contentTransition: 'slide-y-reverse',
  offsetY: 22,
}
