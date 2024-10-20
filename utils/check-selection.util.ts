/* eslint-disable func-names */

export default function (this: any, ...errorMessages: string[]) {
  if (this.checkbox?.state?.value?.length) {
    return true
  }

  const error: any = new Error(errorMessages.join(', '))

  error.data = { message: error.message }

  throw error
}
