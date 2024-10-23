import { Status, UserRole } from '~/enums'

export interface IStaffPayload {
  email: string
  password: string
  email_confirm: boolean
  user_metadata: {
    role?: UserRole
    status?: Extract<Status, Status.DISABLE | Status.ENABLE>
  }
}
