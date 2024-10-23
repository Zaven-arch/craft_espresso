import { $createActionButtonItem } from '../../utils'

import type { IAdminActionButtonConfig, IAdminActionButtonItem } from '../../interfaces'

import { ActionButtonType } from '../../enums'

export default (): IAdminActionButtonConfig => {
  const { isOwner } = useAuth()

  return {
    toolbar: (isHaveAddAction: boolean = false) => {
      const actions: IAdminActionButtonItem[] = []

      if (isHaveAddAction && isOwner.value) {
        actions.push($createActionButtonItem(
          'PRODUCTS.ACTIONS_TOOLBAR.ADD',
          ActionButtonType.PRODUCTS_ADD,
        ))
      }

      if (isOwner.value) {
        actions.push($createActionButtonItem(
          'PRODUCTS.ACTIONS_TOOLBAR.DELETE',
          ActionButtonType.PRODUCTS_DELETE,
        ))
      }

      return actions
    },
    card: (() => {
      const actions: IAdminActionButtonItem[] = [
        $createActionButtonItem(
          'PRODUCTS.BUTTON_ACTIONS.DETAILS',
          ActionButtonType.PRODUCTS_DETAILS,
        ),
      ]

      if (isOwner.value) {
        actions.push(
          $createActionButtonItem(
            'PRODUCTS.BUTTON_ACTIONS.EDIT',
            ActionButtonType.PRODUCTS_EDIT,
          ),
          $createActionButtonItem(
            'PRODUCTS.BUTTON_ACTIONS.DELETE',
            ActionButtonType.PRODUCTS_DELETE,
          ),
        )
      }

      return actions
    })(),
  }
}
