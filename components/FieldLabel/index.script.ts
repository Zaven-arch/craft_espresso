/* eslint-disable no-undef */

import type { IStatusChip } from '~/interfaces'

export interface IFieldLabelProps {
  required: boolean
  optional: boolean
}

export const defaultProps = {
  required: false,
  optional: false,
}

export const useFieldLabelComponent = ({
  required,
  optional,
}: IFieldLabelProps) => {
  const labelData: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (true) {
      case required:
        return {
          text: 'LABEL_TYPE.REQUIRED',
          textColor: 'white',
          color: '!tw-bg-app-light-red',
        }
      case optional:
        return {
          text: 'LABEL_TYPE.OPTIONAL',
          color: '!tw-bg-app-light-grey',
        }
      default:
        return null
    }
  })

  return { labelData }
}
