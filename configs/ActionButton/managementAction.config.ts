import { $createActionButtonItem } from '../../utils'

import type { IAdminActionButtonConfig } from '../../interfaces'

import { ActionButtonType } from '../../enums'

export default {
  toolbar: [
    $createActionButtonItem(
      'MANAGEMENT.ACTIONS_TOOLBAR.ADD',
      ActionButtonType.MANAGEMENT_ADD,
    ),
  ],
  card: [
    $createActionButtonItem(
      'MANAGEMENT.BUTTON_ACTIONS.EDIT',
      ActionButtonType.MANAGEMENT_EDIT,
    ),
  ],
} as IAdminActionButtonConfig
