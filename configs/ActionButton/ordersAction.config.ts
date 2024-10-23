import { $createActionButtonItem } from '../../utils'

import type { IAdminActionButtonConfig, IAdminActionButtonItem } from '../../interfaces'

import { ActionButtonType } from '../../enums'

export default (): IAdminActionButtonConfig => {
  const { isOwner } = useAuth()

  return {
    toolbar: (() => {
      const actions:IAdminActionButtonItem[] = [
        $createActionButtonItem(
          'ORDERS.ACTIONS_TOOLBAR.CHANGE_STATUS',
          ActionButtonType.ORDER_CHANGE_STATUS,
        ),
        $createActionButtonItem(
          'ORDERS.ACTIONS_TOOLBAR.CHANGE_TO_PAID',
          ActionButtonType.ORDERS_CHANGE_TO_PAID,
        ),
      ]

      if (isOwner.value) {
        actions.push(
          $createActionButtonItem(
            'ORDERS.ACTIONS_TOOLBAR.DELETE',
            ActionButtonType.ORDERS_DELETE,
          ),
          $createActionButtonItem(
            'ORDERS.ACTIONS_TOOLBAR.EXPORT',
            ActionButtonType.EXPORT_ORDERS,
          ),
        )
      }

      return actions
    })(),
    card: (() => {
      const actions:IAdminActionButtonItem[] = [
        $createActionButtonItem(
          'ORDERS.BUTTON_ACTIONS.CHANGE_STATUS',
          ActionButtonType.ORDER_CHANGE_STATUS,
        ),
        $createActionButtonItem(
          'ORDERS.BUTTON_ACTIONS.CHANGE_TO_PAID',
          ActionButtonType.ORDERS_CHANGE_TO_PAID,
        ),
      ]

      if (isOwner.value) {
        actions.push(
          $createActionButtonItem(
            'ORDERS.BUTTON_ACTIONS.DELETE',
            ActionButtonType.ORDERS_DELETE,
          ),
        )
      }

      return actions
    })(),
  }
}
