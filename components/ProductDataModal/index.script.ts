/* eslint-disable no-unused-vars */

import type { RuntimeConfig } from 'nuxt/schema'

import {
  Colors, FileExtension, ProductType, Status,
} from '~/enums'
import type { IUseLoading } from '~/interfaces'

import { $getColor, $getImageAsFile } from '~/utils'

export interface IProductDataModalProps {
  loading: boolean
}

export type IEmits = (e:'onSubmit', value: any) => void

export const defaultProps = {
  loading: false,
}

export const useProductDataModalComponent = () => {
  const { t } = useI18n()

  const {
    public: { storageUrl },
  }: RuntimeConfig = useRuntimeConfig()

  const { dataModal, state: productsState, setActiveData } = useProducts()

  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()

  const state: any = reactive({
    isEdit: false,
    form: {},
    key: false,
  })

  watch(dataModal.isOpen, async (value: boolean) => {
    setPending(true)

    if (!value) {
      setActiveData()

      setPending(false)

      return state.form = {}
    }

    if (!productsState.value.active) {
      return setPending(false)
    }

    state.isEdit = true

    const image = await $getImageAsFile({
      url: `${storageUrl}/${productsState.value.active.image}`,
    })

    state.form = {
      ...productsState.value.active,
      oldImage: productsState.value.active.image,
      image: [image].filter((v) => v),
    }

    setPending(false)
  }, { immediate: true })

  const typeItems: any[] = Object
    .entries(ProductType)
    .map(([key, value]) => ({
      text: t(`PRODUCTS.TYPE.${key}`),
      value,
    }))

  const statusItems: any[] = [
    Status.ENABLE,
    Status.DISABLE,
  ]
    .map((value) => ({
      text: t(`STATUS.${value}`),
      value,
    }))

  const accept: FileExtension[] = [
    FileExtension.PNG,
    FileExtension.JPEG,
    FileExtension.JPG,
  ]

  return {
    state,
    accept,
    typeItems,
    statusItems,
    pending,
    isOpen: dataModal.isOpen,
    close: dataModal.close,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
