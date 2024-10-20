export const getRightDate = (date: string): string => {
  const _date = date
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    .split('-')
    .map((item) => item.padStart(2, '0'))
    .join('-')

  return `${_date}T00:00:00.000`
}
