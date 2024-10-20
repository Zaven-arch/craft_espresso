/* eslint-disable no-undef */

import { ActionButtonType, ProductType, Status } from '~/enums'

import type { IUseCheckboxes, IUseModalWindow, IUsePagination } from '~/interfaces'

const dataModal: IUseModalWindow = useModalWindow()
const deleteModal: IUseModalWindow = useModalWindow()
const detailsModal: IUseModalWindow = useModalWindow()

export const useProducts = () => {
  const checkboxRef: any = {
    checkbox: null,
  }

  const state: Ref<any> = useState(() => ({
    data: [],
    length: 0,
    active: null,
    limit: 10,
    keyword: '',
    type: Status.ALL,
    status: Status.ALL,
  }))

  const setData = (items: any[]) => (state.value.data = items)
  const setActiveData = (id?: string) => {
    if (!id) {
      return state.value.active = null
    }

    state.value.active = state.value.data.find(
      (item: any) => item.id === id,
    )
  }
  const setLength = (value: number) => (state.value.length = value)
  const setLimit = (value: number) => (state.value.limit = value)
  const setType = (value: ProductType | Status.ALL) => (state.value.type = value)

  watchEffect(() => {
    checkboxRef.checkbox = useCheckboxes(
      state.value.data || [],
    ) as IUseCheckboxes
  })

  const { page }: IUsePagination = usePagination()

  const actionHandler = (value: ActionButtonType, id?: string) => {
    if (id) {
      checkboxRef.checkbox.state.value = [id]
    }

    switch (value) {
      case ActionButtonType.PRODUCTS_ADD:
        dataModal.open()

        break
      case ActionButtonType.PRODUCTS_EDIT:
        setActiveData(id as string)

        dataModal.open()

        break
      case ActionButtonType.PRODUCTS_DELETE:
        deleteModal.open()

        break
      case ActionButtonType.PRODUCTS_DETAILS:
        setActiveData(id)

        detailsModal.open()

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
    dataModal,
    deleteModal,
    detailsModal,
    setData,
    setType,
    setLength,
    setLimit,
    actionHandler,
    onCloseModal,
    setActiveData,
  }
}
