/* eslint-disable no-unused-vars */

import { $getColor, $range } from '~/utils'

import { Colors } from '~/enums'

export interface IVerticalTimePickerProps {
  modelValue: string
  width: number | string
}

export type IEmits = (e: 'update:modelValue', value: string) => void

export const defaultProps = {
  modelValue: '',
  width: 290,
}

export const useVerticalTimePickerComponent = (
  { modelValue }: IVerticalTimePickerProps,
  emits: IEmits,
) => {
  const POSITION = 3

  const fill = (prop: string, count: number) => {
    for (const value of $range(count)) {
      state[prop].items.set(POSITION - value, `0${value}`.slice(-2))
    }
  }

  const state: any = reactive(
    Object.fromEntries(
      ['hours', 'minutes'].map((value) => [
        value,
        {
          position: POSITION,
          touches: 0,
          clientY: null,
          items: new Map(),
        },
      ]),
    ),
  )

  fill('hours', 24)
  fill('minutes', 60)

  const up = (prop: string) => {
    if (state[prop].position <= POSITION - state[prop].items.size + 1) {
      return false
    }

    state[prop].position -= 1

    return true
  }

  const down = (prop: string) => {
    if (state[prop].position >= POSITION) {
      return false
    }

    state[prop].position += 1

    return true
  }

  const onClickHandler = (position: number, prop: string): number => (state[prop].position = position)

  const onWheelHandler = ({ deltaY }: WheelEvent, prop: string): boolean => (deltaY > 0 ? up(prop) : down(prop))

  const onTouchMoveHandler = ({ touches }: TouchEvent, prop: string) => {
    const { clientY } = touches[0]

    state[prop].touches++

    if (state[prop].touches <= 7) {
      return false
    }

    clientY > state[prop].clientY ? down(prop) : up(prop)

    state[prop].touches = 0

    state[prop].clientY = clientY
  }

  const findKey = (items: any, cb: Function) => {
    for (const item of items.entries()) {
      if (cb(item[1])) {
        return item[0]
      }
    }

    return null
  }

  watch(
    () => modelValue,
    (time: string) => {
      const [hour, minute] = time.split(':')

      state.hours.position = findKey(
        state.hours.items,
        (h: string) => h === hour,
      )

      state.minutes.position = findKey(
        state.minutes.items,
        (m: string) => m === minute,
      )
    },
    { immediate: true },
  )

  const hour: ComputedRef<string> = computed<string>(() => state.hours.items.get(state.hours.position))
  const minute: ComputedRef<string> = computed<string>(() => state.minutes.items.get(state.minutes.position))

  watchEffect(() => emits('update:modelValue', `${hour.value}:${minute.value}`))

  return {
    state,
    hour,
    minute,
    onClickHandler,
    onWheelHandler,
    onTouchMoveHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
