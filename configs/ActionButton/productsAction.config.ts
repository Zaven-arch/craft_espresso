import { $createActionButtonItem } from '../../utils'

import type { IAdminActionButtonConfig, IAdminActionButtonItem } from '../../interfaces'

import { ActionButtonType } from '../../enums'

export default {
  toolbar: (isHaveAddAction: boolean = false) => {
    let actions: IAdminActionButtonItem[] = [
      $createActionButtonItem(
        'PRODUCTS.ACTIONS_TOOLBAR.DELETE',
        ActionButtonType.PRODUCTS_DELETE,
      ),
    ]

    if (isHaveAddAction) {
      actions = [
        $createActionButtonItem(
          'PRODUCTS.ACTIONS_TOOLBAR.ADD',
          ActionButtonType.PRODUCTS_ADD,
        ),
        ...actions,
      ]
    }

    return actions
  },
  card: [
    $createActionButtonItem(
      'PRODUCTS.BUTTON_ACTIONS.EDIT',
      ActionButtonType.PRODUCTS_EDIT,
    ),
    $createActionButtonItem(
      'PRODUCTS.BUTTON_ACTIONS.DELETE',
      ActionButtonType.PRODUCTS_DELETE,
    ),
    $createActionButtonItem(
      'PRODUCTS.BUTTON_ACTIONS.DETAILS',
      ActionButtonType.PRODUCTS_DETAILS,
    ),
  ],
} as IAdminActionButtonConfig
