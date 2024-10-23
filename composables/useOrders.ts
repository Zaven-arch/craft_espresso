/* eslint-disable no-undef */

import { ActionButtonType, Status } from '~/enums'

import type {
  IUseCheckboxes,
  IUseModalWindow,
  IUsePagination,
} from '~/interfaces'
import type { TIsPaid } from '~/types'

const deleteModal: IUseModalWindow = useModalWindow()
const changeStatusModal: IUseModalWindow = useModalWindow()
const changeToPaidModal: IUseModalWindow = useModalWindow()
const filterModal: IUseModalWindow = useModalWindow()
const exportModal: IUseModalWindow = useModalWindow()

export const useOrders = () => {
  const checkboxRef: any = {
    checkbox: null,
  }

  const state: Ref<any> = useState(() => ({
    data: [],
    length: 0,
    limit: 10,
    filter: {
      keyword: '',
      isPaid: Status.ALL,
      status: Status.ALL,
      startDate: '',
      endDate: '',
    },
    orderSet: new Set(),
  }))

  const setData = (items: any[]) => (state.value.data = items)
  const setLength = (value: number) => (state.value.length = value)
  const setLimit = (value: number) => (state.value.limit = value)
  const setStatus = (value: Status) => (state.value.filter.status = value)
  const setIsPaid = (value: TIsPaid) => (state.value.filter.isPaid = value)

  watchEffect(() => {
    checkboxRef.checkbox = useCheckboxes(
      state.value.data || [],
    ) as IUseCheckboxes
  })

  const { page }: IUsePagination = usePagination()

  const resetFilters = () => {
    state.value.filter.keyword = ''
    setIsPaid(Status.ALL)
    setStatus(Status.ALL)
    state.value.filter.startDate = ''
    state.value.filter.endDate = ''
    page.value = 1
  }

  const actionHandler = (value: ActionButtonType, id?: string) => {
    if (id) {
      checkboxRef.checkbox.state.value = [id]
    }

    switch (value) {
      case ActionButtonType.EXPORT_ORDERS:
        exportModal.open()

        break
      case ActionButtonType.ORDERS_DELETE:
        deleteModal.open()

        break
      case ActionButtonType.ORDER_CHANGE_STATUS:
        changeStatusModal.open()

        break
      case ActionButtonType.ORDERS_CHANGE_TO_PAID:
        changeToPaidModal.open()

        break
      default:
    }
  }

  const onCloseModal = (cb: Function) => {
    checkboxRef.checkbox.state.value = []

    cb()
  }

  return {
    page,
    state,
    checkboxRef,
    changeStatusModal,
    deleteModal,
    changeToPaidModal,
    filterModal,
    exportModal,
    setData,
    setLength,
    setLimit,
    actionHandler,
    onCloseModal,
    setStatus,
    setIsPaid,
    resetFilters,
  }
}
