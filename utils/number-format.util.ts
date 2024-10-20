export function numberFormat(
  this: any,
  value: string | number,
  arg?: any,
): string {
  const text = new Intl.NumberFormat(arg || 'en-US').format(Number(value))

  if (!this) {
    return text
  }

  return this.innerText = text
}
