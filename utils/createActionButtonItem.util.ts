/* eslint-disable func-names */

import type { IAdminActionButtonItem } from '~/interfaces'

import { ActionButtonType } from '~/enums'

export default function (
  name: string,
  value: ActionButtonType,
  disabled: boolean = false,
): IAdminActionButtonItem {
  return { name, value, disabled }
}
