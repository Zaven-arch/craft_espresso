import { $createActionButtonItem } from '../../utils'

import type { IAdminActionButtonConfig } from '../../interfaces'

import { ActionButtonType } from '../../enums'

export default {
  toolbar: [
    $createActionButtonItem(
      'ORDERS.ACTIONS_TOOLBAR.CHANGE_STATUS',
      ActionButtonType.ORDER_CHANGE_STATUS,
    ),
    $createActionButtonItem(
      'ORDERS.ACTIONS_TOOLBAR.CHANGE_TO_PAID',
      ActionButtonType.ORDERS_CHANGE_TO_PAID,
    ),
    $createActionButtonItem(
      'ORDERS.ACTIONS_TOOLBAR.DELETE',
      ActionButtonType.ORDERS_DELETE,
    ),
  ],
  card: [
    $createActionButtonItem(
      'ORDERS.BUTTON_ACTIONS.CHANGE_STATUS',
      ActionButtonType.ORDER_CHANGE_STATUS,
    ),
    $createActionButtonItem(
      'ORDERS.BUTTON_ACTIONS.CHANGE_TO_PAID',
      ActionButtonType.ORDERS_CHANGE_TO_PAID,
    ),
    $createActionButtonItem(
      'ORDERS.BUTTON_ACTIONS.DELETE',
      ActionButtonType.ORDERS_DELETE,
    ),
  ],
} as IAdminActionButtonConfig
