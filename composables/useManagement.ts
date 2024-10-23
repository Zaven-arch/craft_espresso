/* eslint-disable no-undef */

import { ActionButtonType, ManagementType, Status } from '~/enums'

import type {
  IUseCheckboxes,
  IUseModalWindow,
  IUsePagination,
} from '~/interfaces'

const dataModal: IUseModalWindow = useModalWindow()

export const useManagement = () => {
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
  }))

  const setData = (items: any[]) => (state.value.data = items)
  const setActiveData = (id?: string) => {
    if (!id) {
      return (state.value.active = null)
    }

    state.value.active = state.value.data?.find((item: any) => item.id === id)
  }
  const setLength = (value: number) => (state.value.length = value)
  const setLimit = (value: number) => (state.value.limit = value)
  const setType = (value: ManagementType | Status.ALL) => (state.value.type = value)

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
      case ActionButtonType.MANAGEMENT_ADD:
        dataModal.open()

        break
      case ActionButtonType.MANAGEMENT_EDIT:
        setActiveData(id as string)

        dataModal.open()

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
    setData,
    setType,
    setLength,
    setLimit,
    actionHandler,
    onCloseModal,
    setActiveData,
  }
}
