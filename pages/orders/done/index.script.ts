/* eslint-disable no-undef */

import { Colors, Status } from '~/enums'

import { ordersActionConfig as _ordersActionConfig } from '~/configs'

import {
  OrdersService,
} from '~/services'

import type { IOrder, IUseLoading, IUseSnackbar } from '~/interfaces'

export const useOrdersDonePage = () => {
  const { t } = useI18n()

  const ordersActionConfig = _ordersActionConfig()

  const {
    page,
    state,
    checkboxRef,
    deleteModal,
    filterModal,
    changeStatusModal,
    changeToPaidModal,
    exportModal,
    onCloseModal,
    actionHandler,
    setData,
    setLength,
    setStatus,
    resetFilters,
  } = useOrders()

  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()
  const { loading: downloadLoading, setLoading: setDownloadLoading }: IUseLoading = useLoading()
  const { loading: deleteLoading, setLoading: setDeleteLoading }: IUseLoading = useLoading()
  const {
    loading: changeToPaidLoading,
    setLoading: setChangeToPaidLoading,
  }: IUseLoading = useLoading()
  const {
    loading: changeStatusLoading,
    setLoading: setChangeStatusLoading,
  }: IUseLoading = useLoading()

  const { $open }: IUseSnackbar = useSnackbar()

  const {
    getList, update, remove, download,
  } = new OrdersService()

  const onGetListData = async () => {
    try {
      setStatus(Status.DONE)

      setPending(true)

      const { data, total_page: length } = await getList({
        like: state.value.filter.keyword,
        limit: state.value.limit,
        isPaid: state.value.filter.isPaid,
        status: state.value.filter.status,
        startDate: state.value.filter.startDate,
        endDate: state.value.filter.endDate,
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

  onUnmounted(resetFilters)

  watch(page, onGetListData)

  const onRefreshShownData = async () => {
    if (page.value > 1) {
      page.value = 1

      return true
    }

    await onGetListData()
  }

  const onSearchHandler = async () => {
    try {
      setPending(true)

      page.value = 1

      await onGetListData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setPending(false)
    }
  }

  const onDeleteHandler = async () => {
    try {
      setDeleteLoading(true)

      $checkSelection.call(checkboxRef, t('SNACKBAR.NOT_SELECTED'))

      await Promise.all(
        checkboxRef.checkbox?.state?.value?.map(async (id: string) => {
          const order: IOrder = state.value.data?.find((item: IOrder) => item.id === id)

          if (!order) {
            return
          }

          await remove(id)

          state.value.orderSet.delete(order.order)
        }),
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

  const onChangeToPaidHandler = async () => {
    try {
      setChangeToPaidLoading(true)

      $checkSelection.call(checkboxRef, t('SNACKBAR.NOT_SELECTED'))

      await Promise.all(
        checkboxRef.checkbox?.state?.value?.map(async (id: string) => {
          const order: IOrder = state.value.data?.find((item: IOrder) => item.id === id)

          if (!order) {
            return
          }

          await update({
            id: order.id,
            price: order.price,
            order: order.order,
            status: order.status,
            payment_method: order.payment_method,
            is_paid: 'YES',
          })
        }),
      )

      $open(Colors.GREEN, t('SNACKBAR.ORDER_PAID'))

      await onRefreshShownData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setChangeToPaidLoading(false)

      onCloseModal(changeToPaidModal.close)
    }
  }

  const onChangeStatusHandler = async (status: Extract<Status, Status.DONE | Status.WAIT>) => {
    try {
      setChangeStatusLoading(true)

      $checkSelection.call(checkboxRef, t('SNACKBAR.NOT_SELECTED'))

      await Promise.all(
        checkboxRef.checkbox?.state?.value?.map(async (id: string) => {
          const order: IOrder = state.value.data?.find((item: IOrder) => item.id === id)

          if (!order) {
            return
          }

          await update({
            id: order.id,
            price: order.price,
            order: order.order,
            is_paid: order.is_paid,
            payment_method: order.payment_method,
            status,
          })

          if (status === Status.DONE) {
            state.value.orderSet.delete(order.order)
          }
        }),
      )

      $open(Colors.GREEN, t('SNACKBAR.ORDER_STATUS'))

      await onRefreshShownData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setChangeStatusLoading(false)

      onCloseModal(changeStatusModal.close)
    }
  }

  const onDownloadHandler = async (filters: any) => {
    try {
      setDownloadLoading(true)

      await download({
        ...filters,
        status: state.value.filter.status,
      })
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setDownloadLoading(false)

      exportModal.close()
    }
  }

  const statusItems: any[] = [
    Status.WAIT,
    Status.DONE,
  ].map((value: string) => ({
    text: t(`STATUS.${value}`),
    value,
  }))

  return {
    page,
    state,
    checkboxRef,
    pending,
    onSearchHandler,
    actionHandler,
    deleteModal,
    filterModal,
    deleteLoading,
    onCloseModal,
    onDeleteHandler,
    changeToPaidModal,
    changeToPaidLoading,
    onChangeToPaidHandler,
    statusItems,
    changeStatusModal,
    changeStatusLoading,
    onChangeStatusHandler,
    exportModal,
    downloadLoading,
    onDownloadHandler,
    ordersActionConfig,
  }
}
