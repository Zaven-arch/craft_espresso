/* eslint-disable no-unused-vars */
import { Colors } from '~/enums'

import type { IFileDetails } from '~/interfaces'

import { $getColor } from '~/utils'

export interface IUploadedPictureCardProps {
  file: IFileDetails
  buttonColor: string
  cover: boolean
  deleteButton: boolean
  minHeight: string | number
  height: string | number
  width: string | number
  aspectRatio: string | number
}

export type IEmits = (e: 'onDelete', file: IFileDetails) => void

export const defaultProps = {
  file: () => ({}) as IFileDetails,
  buttonColor: $getColor(Colors.PRIMARY_RED),
  cover: false,
  deleteButton: true,
  minHeight: 250,
  height: '100%',
  width: '100%',
  aspectRatio: '',
}

export const useUploadedPictureCardComponent = ({
  file,
}: IUploadedPictureCardProps) => {
  const filename: ComputedRef<string> = computed(
    () => `${file?.file?.name} (${file.size})`,
  )

  return { filename }
}
