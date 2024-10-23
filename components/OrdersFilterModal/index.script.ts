/* eslint-disable no-unused-vars */

import { $getColor } from '~/utils'

import { Colors, Status } from '~/enums'

export type IEmits = (e: 'onSubmit') => void

export const useOrdersFilterModalComponent = (emits: IEmits) => {
  const { t } = useI18n()

  const paidStatusItems: any[] = [Status.ALL, 'YES', 'NO'].map(
    (value: string) => ({
      text: t(`ORDERS.PAID.${value || 'ALL'}`),
      value,
    }),
  )

  const { state, filterModal } = useOrders()

  const onSearchHandler = () => {
    emits('onSubmit')

    filterModal.close()
  }

  return {
    state,
    paidStatusItems,
    onSearchHandler,
    color: $getColor(Colors.PRIMARY_RED),
    isOpen: filterModal.isOpen,
    close: filterModal.close,
  }
}
