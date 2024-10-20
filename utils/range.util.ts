/* eslint-disable no-plusplus */
/* eslint-disable func-names */

export default function* (...[start, end]: any[]) {
  let i = end ? start : 0

  while (i < (end ?? start)) {
    yield i++
  }
}
