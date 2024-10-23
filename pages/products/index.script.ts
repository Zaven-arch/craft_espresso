/* eslint-disable no-undef */

import { $getColor } from '~/utils'

import { Colors, Status } from '~/enums'

import { productsActionConfig as _productsActionConfig } from '~/configs'

import { ProductsService, UploadService } from '~/services'

import type { IUseLoading, IUseSnackbar } from '~/interfaces'

export const useProductsPage = () => {
  const { t } = useI18n()

  const productsActionConfig = _productsActionConfig()

  const {
    page,
    state,
    checkboxRef,
    dataModal,
    deleteModal,
    onCloseModal,
    actionHandler,
    setData,
    setLength,
    setType,
  } = useProducts()

  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()
  const { loading: searchLoading, setLoading: setSearchLoading }: IUseLoading = useLoading()
  const { loading: statusLoading, setLoading: setStatusLoading }: IUseLoading = useLoading()
  const { loading: deleteLoading, setLoading: setDeleteLoading }: IUseLoading = useLoading()
  const { loading: submitLoading, setLoading: setSubmitLoading }: IUseLoading = useLoading()

  const { $open }: IUseSnackbar = useSnackbar()

  const {
    getList, create, update, remove,
  } = new ProductsService()

  const { save, remove: removeFile } = new UploadService()

  const onGetListData = async () => {
    try {
      setType(Status.ALL)

      setPending(true)

      const { data, total_page: length } = await getList({
        like: state.value.keyword,
        type: state.value.type,
        limit: state.value.limit,
        status: state.value.status,
        page: page.value,
      })

      setData(data ?? [])

      setLength(length)
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setPending(false)
    }
  }

  onMounted(onGetListData)

  onUnmounted(() => {
    state.value.keyword = ''
    state.value.type = Status.ALL
    state.value.status = Status.ALL
    page.value = 1
  })

  watch(page, onGetListData)

  const onRefreshShownData = async () => {
    if (page.value > 1) {
      page.value = 1

      return true
    }

    await onGetListData()
  }

  const onSearchHandler = async (type: string = '') => {
    const isStatus: boolean = type === 'status'

    try {
      isStatus ? setStatusLoading(true) : setSearchLoading(true)

      page.value = 1

      await onGetListData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      isStatus ? setStatusLoading(false) : setSearchLoading(false)
    }
  }

  const onDeleteHandler = async () => {
    try {
      setDeleteLoading(true)

      $checkSelection.call(checkboxRef, t('SNACKBAR.NOT_SELECTED'))

      await Promise.all(
        checkboxRef.checkbox?.state?.value?.map((id: string) => remove(id)),
      )

      $open(Colors.GREEN, t('SNACKBAR.DELETE_PRODUCT'))

      await onRefreshShownData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setDeleteLoading(false)

      onCloseModal(deleteModal.close)
    }
  }

  const onSubmitHandler = async (_payload: any) => {
    try {
      setSubmitLoading(true)

      if (_payload.form.oldImage) {
        await removeFile(_payload.form.oldImage)
      }

      if (_payload.form.image?.length) {
        const { path }: any = await save(_payload.form.image?.[0]?.file)

        _payload.form.image = path
      } else {
        _payload.form.image = null
      }

      delete _payload.form.oldImage

      _payload.isEdit
        ? await update(_payload.form)
        : await create(_payload.form)

      $open(Colors.GREEN, t('SNACKBAR.DATA_PRODUCTS', Number(_payload.isEdit)))

      await onRefreshShownData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setSubmitLoading(false)

      onCloseModal(dataModal.close)
    }
  }

  watch(
    () => state.value.status,
    () => onSearchHandler('status'),
  )

  const statusItems: any[] = [Status.ALL, Status.ENABLE, Status.DISABLE].map(
    (value: Status) => ({
      text: t(`STATUS.${value || 'ALL'}`),
      value,
    }),
  )

  return {
    page,
    state,
    checkboxRef,
    pending,
    statusItems,
    onSearchHandler,
    searchLoading,
    statusLoading,
    actionHandler,
    deleteModal,
    deleteLoading,
    onCloseModal,
    onDeleteHandler,
    submitLoading,
    onSubmitHandler,
    productsActionConfig,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
