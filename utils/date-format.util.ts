import { DateTime } from 'luxon'

import { DateFormat } from '../enums'

export function dateFormat(
  this: any,
  value: string,
  format: DateFormat,
  timezone: string | null | undefined,
): string {
  const date = DateTime.fromISO(value)

  if (!value?.trim()) {
    return (this.innerHTML = '&mdash;')
  }

  if (!date.isValid) {
    if (!this) {
      return value
    }

    return (this.innerText = value)
  }

  if (!this) {
    return date.setZone(timezone || 'local').toFormat(format)
  }

  return (this.innerText = date.setZone(timezone || 'local').toFormat(format))
}
