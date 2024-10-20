/* eslint-disable no-unused-vars */

import { FileExtension } from '~/enums'

import type { IFileDetails } from './IFileDetails.interface'

export interface IUseUploadFile {
  state: any
  setCount(value: number): number
  setMultiple(value: boolean): boolean
  setAcceptTypes(extensions: FileExtension[]): void
  onDeleteHandler(item: IFileDetails): void
  onChangeHandler(value: any): any
  onDropHandler(e: any): void
}
