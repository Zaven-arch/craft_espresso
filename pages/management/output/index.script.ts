/* eslint-disable no-undef */

import { $getColor } from '~/utils'

import { Colors, ManagementType, Status } from '~/enums'

import { managementActionConfig } from '~/configs'

import { ManagementService } from '~/services'

import type { IUseLoading, IUseSnackbar } from '~/interfaces'

export const useManagementOutputPage = () => {
  const { t } = useI18n()

  const {
    page,
    state,
    checkboxRef,
    dataModal,
    onCloseModal,
    actionHandler,
    setData,
    setLength,
    setType,
  } = useManagement()

  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()
  const { loading: searchLoading, setLoading: setSearchLoading }: IUseLoading =
    useLoading()
  const { loading: submitLoading, setLoading: setSubmitLoading }: IUseLoading =
    useLoading()

  const { $open }: IUseSnackbar = useSnackbar()

  const { getList, update } = new ManagementService()

  const onGetListData = async () => {
    try {
      setType(ManagementType.OUTPUT)

      setPending(true)

      const { data, total_page: length } = await getList({
        like: state.value.keyword,
        type: state.value.type,
        limit: state.value.limit,
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
    state.value.type = ManagementType.OUTPUT
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

  const onSearchHandler = async () => {
    try {
      setSearchLoading(true)

      page.value = 1

      await onGetListData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setSearchLoading(false)
    }
  }

  const onSubmitHandler = async (_payload: any) => {
    try {
      setSubmitLoading(true)

      await update(_payload.form)

      $open(Colors.GREEN, t('SNACKBAR.DATA_MANAGEMENT', 1))

      await onRefreshShownData()
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setSubmitLoading(false)

      onCloseModal(dataModal.close)
    }
  }

  return {
    page,
    state,
    checkboxRef,
    pending,
    onSearchHandler,
    searchLoading,
    actionHandler,
    submitLoading,
    onSubmitHandler,
    managementActionConfig,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
