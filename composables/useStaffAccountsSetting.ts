/* eslint-disable no-undef */

// import { ActionButtonType } from '~/enums'

import { Status } from '~/enums'
import type { IUseCheckboxes, IUseModalWindow, IUsePagination } from '~/interfaces'

const dataModal: IUseModalWindow = useModalWindow()
const changeModal: IUseModalWindow = useModalWindow()
const deleteModal: IUseModalWindow = useModalWindow()

export const useStaffAccountsSetting = ({ t }: any) => {
  const state: Ref<any> = useState(() => ({
    data: [],
    active: null,
    isEditModal: false,
    isNeedToRefresh: false,
    length: 0,
    limit: 10,
    keyword: '',
    status: Status.ALL,
  }))

  const setData = (items: any[]) => (state.value.data = items)
  const setActiveData = (id?: string) => {
    if (!id) {
      return state.value.active = null
    }

    state.value.active = state.value.data?.find(
      (item: any) => item.id === id,
    )
  }
  const setLength = (value: number) => (state.value.length = value)
  const setLimit = (value: number) => (state.value.limit = value)
  const setIsEditModal = (value: boolean) => (state.value.isEditModal = value)
  const setIsNeedToRefresh = (value: boolean) => (state.value.isNeedToRefresh = value)

  const { page }: IUsePagination = usePagination()

  const statuses: any[] = [
    {
      text: t('STATUS.DISABLE'),
      value: Status.DISABLE,
    },
    {
      text: t('STATUS.ENABLE'),
      value: Status.ENABLE,
    },
  ]

  return {
    page,
    state,
    statuses,
    dataModal,
    deleteModal,
    changeModal,
    setData,
    setLength,
    setLimit,
    setActiveData,
    setIsEditModal,
    setIsNeedToRefresh,
  }
}
