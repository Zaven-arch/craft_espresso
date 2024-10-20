/* eslint-disable no-undef */

import { useDisplay } from 'vuetify'

export interface IEmptyDataProps {
  minWidth: string | number
  maxWidth: string | number
  elevation: string | number
  src: string
}

export const defaultProps = {
  minWidth: '100%',
  maxWidth: 0,
  elevation: 0,
  src: '',
}

export const useEmptyDataComponent = ({ maxWidth }: IEmptyDataProps) => {
  const { xs } = useDisplay()

  const size: ComputedRef<number | string> = computed(() => {
    if (maxWidth) {
      return maxWidth
    }

    return xs.value ? 150 : 250
  })

  return { size }
}
