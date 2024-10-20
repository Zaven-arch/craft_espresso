/* eslint-disable no-undef */

export interface IUseModalWindow {
  isOpen: Ref<boolean>
  open(): boolean
  close(): boolean
}
