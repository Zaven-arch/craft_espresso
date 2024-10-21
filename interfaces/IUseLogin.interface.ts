/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export interface IUseLogin {
  loading: Ref<boolean>
  submitHandler($validate: any): Promise<boolean | void>
}
