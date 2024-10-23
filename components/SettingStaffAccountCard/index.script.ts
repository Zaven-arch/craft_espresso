/* eslint-disable no-undef */

import { UserRole, Colors, Status } from '~/enums'

import type { IStatusChip } from '~/interfaces'

import { $getColor } from '~/utils'

export interface ISettingStaffAccountCardProps {
  id: string
  email: string
  status: Status
  permission: UserRole
  lastLogin: string
}

export const defaultProps = {
  id: '',
  email: '',
  lastLogin: '',
}

export const useSettingStaffAccountCardComponent = ({
  id,
  status,
  permission,
}: ISettingStaffAccountCardProps) => {
  const { t } = useI18n()

  const isOwner: ComputedRef<boolean> = computed<boolean>(
    () => permission === UserRole.OWNER,
  )

  const {
    dataModal, deleteModal, changeModal, setIsEditModal, setActiveData,
  } = useStaffAccountsSetting({ t })

  const openEditModal = () => {
    setIsEditModal(true)

    dataModal.open()

    setActiveData(id)
  }

  const cardStatus: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (status) {
      case Status.ENABLE:
        return {
          text: 'STATUS.ENABLE',
          textColor: 'white',
          color: '!tw-bg-app-green',
        }
      case Status.DISABLE:
        return {
          text: 'STATUS.DISABLE',
          textColor: 'white',
          color: '!tw-bg-app-primary-red',
        }
      default:
        return null
    }
  })

  const onOpenModal = (isChangeModal = false) => {
    setActiveData(id)

    if (isChangeModal) {
      return changeModal.open()
    }

    return deleteModal.open()
  }

  return {
    cardStatus,
    isOwner,
    dataModal,
    deleteModal,
    changeModal,
    openEditModal,
    onOpenModal,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
