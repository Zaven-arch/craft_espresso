/* eslint-disable func-names */

export default function (route: string): string {
  return route.replace(/^root|\s+|(.*)/, '/$1')
}
