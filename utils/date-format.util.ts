import { DateFormat } from '@lxgic/enums'

import { DateTime } from 'luxon'

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
    return (this.innerText = value)
  }

  return (this.innerText = date.setZone(timezone || 'local').toFormat(format))
}
