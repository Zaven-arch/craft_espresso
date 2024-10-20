/* eslint-disable no-unused-vars */

import { IBadgeState } from './IBadgeState.interface'

export interface IUseBadge {
  state: IBadgeState
  setContent(content: number): number
}
