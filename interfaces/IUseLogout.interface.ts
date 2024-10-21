/* eslint-disable no-unused-vars */

export interface IUseLogout {
  loading: Ref<boolean>
  setLoading(value: boolean): boolean
  logout(fn: Function): Promise<void>
}
