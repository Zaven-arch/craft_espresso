/* eslint-disable no-undef */

import { Colors, Status } from '~/enums'

import type { IStaffPayload, IUseLoading, IUseSnackbar } from '~/interfaces'

import { $getColor } from '~/utils'

import { StaffSettingsService } from '~/services'

export const useSettingsStaffPage = async () => {
  const { t } = useI18n()

  const {
    state,
    page,
    setData,
    statuses,
    dataModal,
    changeModal,
    deleteModal,
    setLength,
    setActiveData,
    setIsNeedToRefresh,
  } = useStaffAccountsSetting({ t })

  onUnmounted(() => setData([]))

  const { getStaffAccounts, remove, update } = new StaffSettingsService()

  const { $open }: IUseSnackbar = useSnackbar()

  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()
  const { loading: deleteLoading, setLoading: setDeleteLoading }: IUseLoading = useLoading(false)
  const { loading: changeLoading, setLoading: setChangeLoading }: IUseLoading = useLoading(false)

  const onGetListData = async () => {
    try {
      setPending(true)

      const { data, total_page: length }: any = await getStaffAccounts({
        perPage: state.value.limit,
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

  watch(page, onGetListData)

  const onRefreshShownData = async () => {
    if (page.value > 1) {
      page.value = 1

      return true
    }

    await onGetListData()
  }

  watchEffect(async () => {
    if (!state.value.isNeedToRefresh) {
      return false
    }

    await onRefreshShownData()

    setIsNeedToRefresh(false)
  })

  const onCloseModal = (isChangeModal = false) => {
    setActiveData()

    if (isChangeModal) {
      return changeModal.close()
    }

    return deleteModal.close()
  }

  const onChangeHandler = async (
    status: Extract<Status, Status.ENABLE | Status.DISABLE>,
  ) => {
    try {
      setChangeLoading(true)

      await update(state.value.active?.id, {
        user_metadata: {
          status,
        },
      })

      $open(Colors.GREEN, t('SNACKBAR.UPDATE_STATUS_STAFF_ADMIN'))

      await onRefreshShownData()
    } catch (e: any) {
      $open(
        Colors.RED,
        Array.isArray(e?.data?.message)
          ? e?.data?.message?.join(', ')
          : e?.data?.message,
      )
    } finally {
      setChangeLoading(false)

      onCloseModal(true)
    }
  }

  const onDeleteHandler = async () => {
    try {
      setDeleteLoading(true)

      await remove(state.value.active?.id)

      $open(Colors.GREEN, t('SNACKBAR.DELETE_STAFF_ADMIN'))

      await onRefreshShownData()
    } catch (e: any) {
      $open(
        Colors.RED,
        Array.isArray(e?.data?.message)
          ? e?.data?.message?.join(', ')
          : e?.data?.message,
      )
    } finally {
      setDeleteLoading(false)

      onCloseModal()
    }
  }

  return {
    pending,
    page,
    state,
    dataModal,
    changeModal,
    deleteModal,
    deleteLoading,
    changeLoading,
    statuses,
    onCloseModal,
    onDeleteHandler,
    onChangeHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
