import type { RuntimeConfig } from 'nuxt/schema'

import { v4 as uuid } from 'uuid'

import { $getColor } from '~/utils'

import { Colors, ProductType } from '~/enums'

import type {
  IProductDetail, IStatusChip, IUseLoading, IUseSnackbar,
} from '~/interfaces'

import { ProductsService } from '~/services'

export const useProductDetailsDrawerComponent = () => {
  const { t } = useI18n()

  const {
    public: { storageUrl },
  }: RuntimeConfig = useRuntimeConfig()

  const { detailsModal, state, onCloseModal } = useProducts()

  const { loading, setLoading }: IUseLoading = useLoading()

  const { $open }: IUseSnackbar = useSnackbar()

  const {
    update,
  } = new ProductsService()

  const details:Ref<IProductDetail[]> = ref<IProductDetail[]>([])
  const isReadOnly:Ref<boolean> = ref<boolean>(true)
  const isBig:Ref<boolean> = ref<boolean>(false)

  const onToggleSize = () => (isBig.value = !isBig.value)

  const cardType: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (state.value.active?.type) {
      case ProductType.TEA:
        return {
          text: 'PRODUCTS.TYPE.TEA',
          textColor: 'white',
          color: '!tw-bg-app-yellow-light',
        }
      case ProductType.COFFEE:
        return {
          text: 'PRODUCTS.TYPE.COFFEE',
          textColor: 'white',
          color: '!tw-bg-app-primary-black',
        }
      case ProductType.FRESH:
        return {
          text: 'PRODUCTS.TYPE.FRESH',
          textColor: 'white',
          color: '!tw-bg-app-orange',
        }
      default:
        return {
          text: 'PRODUCTS.TYPE.OTHER',
          textColor: 'white',
          color: '!tw-bg-app-grey-font',
        }
    }
  })

  const photo: ComputedRef<string> = computed<string>(
    () => (state.value.active?.image
      ? `${storageUrl}/${state.value.active?.image}`
      : '/images/empty.png'),
  )

  const onAddItemHandler = () => details.value.push({
    id: uuid(),
    name: '',
    value: '',
    is_gram: false,
  })

  const onRemoveHandler = (id: string | undefined) => {
    if (!id) {
      return
    }

    details.value = details.value.filter((item) => item.id !== id)
  }

  const onToggleEditHandler = (value: boolean = false) => (
    isReadOnly.value = value || !isReadOnly.value)

  const onEditHandler = async () => {
    if (isReadOnly.value) {
      return onToggleEditHandler()
    }

    try {
      setLoading(true)

      const prop = isBig.value ? 'big_details' : 'small_details'

      await update({
        ...state.value.active,
        [prop]: JSON.stringify(details.value),
      })

      $open(Colors.GREEN, t('SNACKBAR.DATA_PRODUCTS', 1))
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setLoading(false)

      onCloseModal(detailsModal.close)
    }
  }

  watch(detailsModal.isOpen, (value: boolean) => {
    if (!value) {
      details.value = []

      return onToggleEditHandler(true)
    }
    if (isBig.value && state.value.active?.big_details) {
      return details.value = JSON.parse(state.value.active.big_details || '[]')
    }

    if (!isBig.value && state.value.active?.small_details) {
      return details.value = JSON.parse(state.value.active.small_details || '[]')
    }
  })

  watch(isBig, (value: boolean) => {
    if (value && state.value.active?.big_details) {
      return details.value = JSON.parse(state.value.active.big_details || '[]')
    }

    if (!value && state.value.active?.small_details) {
      return details.value = JSON.parse(state.value.active.small_details || '[]')
    }

    details.value = []

    details.value = []
  }, { immediate: true })

  return {
    state,
    isBig,
    details,
    cardType,
    photo,
    isReadOnly,
    loading,
    onEditHandler,
    onAddItemHandler,
    onRemoveHandler,
    onToggleSize,
    isOpen: detailsModal.isOpen,
    close: detailsModal.close,
    onCloseModal,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
