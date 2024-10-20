/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export interface IUseCopy {
  isCopied: Ref<boolean>
  icon: ComputedRef<string>
  doCopy(data: string): Promise<boolean | void>
}
