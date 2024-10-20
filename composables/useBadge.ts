/* eslint-disable no-undef */

import type { IBadgeState, IUseBadge } from '~/interfaces'

export const useBadge = (): IUseBadge => {
  const state: IBadgeState = reactive<IBadgeState>({
    content: 0,
  })

  const setContent = (content: number) => (state.content = content)

  return {
    state,
    setContent,
  }
}
