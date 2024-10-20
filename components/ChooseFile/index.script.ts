/* eslint-disable no-unused-vars */

import { $getColor } from '~/utils'

import type { IUseSnackbar, IUseUploadFile, IFileDetails } from '~/interfaces'

import { Colors, FileExtension } from '~/enums'

export interface IChooseFileProps {
  modelValue: any[]
  clickable: boolean
  multiple: boolean
  accept: FileExtension[]
  max: string | number
  minHeight: string | number
  textClass: string
}

export type IEmits = (event: 'update:modelValue', value: IFileDetails[]) => void

export const defaultProps = {
  modelValue: () => [],
  clickable: false,
  multiple: false,
  max: 1,
  minHeight: 250,
  textClass: '',
  accept: () => [],
}

export const useChooseFileComponent = (
  {
    multiple, max, accept, modelValue,
  }: IChooseFileProps,
  emits: IEmits,
) => {
  const fileUploader: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)

  const { $i18n } = useNuxtApp()

  const { $open }: IUseSnackbar = useSnackbar()

  const {
    state,
    setCount,
    setMultiple,
    setAcceptTypes,
    onChangeHandler,
    onDeleteHandler,
    onDropHandler,
  }: IUseUploadFile = useUploadFile()

  setCount(+max)
  setAcceptTypes(accept)
  setMultiple(multiple)

  const onChange = (value: any, isDrop = false): any => {
    try {
      isDrop ? onDropHandler(value) : onChangeHandler(value)

      emits('update:modelValue', state.files)
    } catch (e) {
      return $open(Colors.RED, $i18n.t('SNACKBAR.INVALID_FILE_TYPE'))
    }
  }

  if (modelValue.length) {
    onChange(modelValue)
  }

  const isVisible: ComputedRef<boolean> = computed(() => {
    if (multiple && state.files.length < state.count) {
      return true
    }

    return !state.files.length
  })

  const onButtonClick = (): any => fileUploader.value?.click()

  const onWrapDeleteHandler = (item: IFileDetails): void => {
    onDeleteHandler(item)

    emits('update:modelValue', state.files)
  }

  return {
    state,
    isVisible,
    fileUploader,
    color: $getColor(Colors.GUN_POWDER),
    backgroundColor: $getColor(Colors.LIGHT_BLUE),
    buttonColor: $getColor(Colors.PRIMARY_RED),
    onChange,
    onWrapDeleteHandler,
    onButtonClick,
  }
}
