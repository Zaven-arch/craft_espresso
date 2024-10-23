import { UserRole } from '~/enums'

import { AuthService } from '~/services'

export const useAuth = () => {
  const isOwner: ComputedRef<boolean> = computed<boolean>(
    () => AuthService.user?.user_metadata?.role === UserRole.OWNER,
  )

  return { isOwner }
}
