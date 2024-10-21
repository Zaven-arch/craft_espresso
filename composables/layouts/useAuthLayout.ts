import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export const useAuthLayout = () => ({
  color: $getColor(Colors.PRIMARY_RED),
})
