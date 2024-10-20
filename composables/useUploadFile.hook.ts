import { partial } from 'filesize'

import { FileExtension, FileType } from '~/enums'

import type { IFileDetails, IUseUploadFile } from '~/interfaces'

export function useUploadFile(): IUseUploadFile {
  const isMultiple: Ref<boolean> = ref<boolean>(false)

  const state: any = reactive({
    count: 1,
    dragover: false,
    files: [],
    acceptTypes: [],
  })

  const getFileDetails = (file: File): IFileDetails => ({
    file,
    src: URL.createObjectURL(file),
    size: partial({ round: 1 })(file.size) as string,
  })

  const setCount = (value: number): number => (state.count = value)

  const setMultiple = (value: boolean): boolean => (isMultiple.value = value)

  const setAcceptTypes = (extensions: FileExtension[]): void => {
    state.acceptTypes = Object.entries(FileExtension)
      .map(
        ([key, value]) => extensions.includes(value) && FileType[key as keyof typeof FileType],
      )
      .filter((v) => v)
  }

  const onDeleteHandler = ({ src, file }: IFileDetails): void => {
    URL.revokeObjectURL(src)

    state.files = state.files.filter(
      (item: any) => item.file.name !== file.name,
    )
  }

  const onChangeHandler = (value: any): any => {
    if (!value) {
      return false
    }

    let files: any[]

    if (Array.isArray(value)) {
      const deleteCount: number = state.count - state.files.length

      files = value.splice(0, deleteCount)
    } else {
      files = [value]
    }

    if (files.some(({ type }: File) => !state.acceptTypes.includes(type))) {
      throw new Error('Invalid file(s) type')
    }

    if (isMultiple.value) {
      state.files.push(...files.map(getFileDetails))
    } else {
      state.files = files.map(getFileDetails)
    }
  }

  const onDropHandler = (e: any): void => {
    state.dragover = false

    onChangeHandler(Object.values(e.dataTransfer.files))
  }

  return {
    state,
    onChangeHandler,
    onDeleteHandler,
    onDropHandler,
    setMultiple,
    setAcceptTypes,
    setCount,
  }
}
