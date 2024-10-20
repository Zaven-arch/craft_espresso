/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

import { DateTime } from 'luxon'

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import type { IUseModalWindow } from '~/interfaces'

enum DateFormat {
  FULL_DATE = 'yyyy/MM/dd HH:mm',
  DATE = 'yyyy/MM/dd',
}

export interface IDateTimeModalProps {
  modelValue: string
  modelModifiers: any
  dateOnly: boolean
  readonly: boolean
  dialogContentClass: string
  allowDates: (date: unknown) => boolean
}

export type IEmits = (event: 'update:modelValue', value: string) => void

export const defaultProps = {
  modelValue: '',
  modelModifiers: () => ({}),
  dateOnly: false,
  readonly: false,
  dialogContentClass: '',
  allowDates: (_date: unknown) => true,
}

export const useDateTimeModalComponent = (
  { modelValue, modelModifiers, dateOnly }: IDateTimeModalProps,
  emits: IEmits,
) => {
  const { isOpen, close, open }: IUseModalWindow = useModalWindow()

  const state: any = reactive({
    isDate: true,
    date: null,
    year: null,
    time: null,
    fullDate: '',
  })

  const setDefaultDate = (isClear = false) => {
    state.date = modelValue && !isClear ? new Date(modelValue) : new Date()

    state.year = state.date?.getFullYear() || null

    const date: any = DateTime.fromISO(state.date.toISOString())

    state.time = date.toFormat('HH:mm')

    state.fullDate = modelValue ? date.toFormat(DateFormat.FULL_DATE) : ''
  }

  setDefaultDate()

  const titleAsYear: ComputedRef<string> = computed<string>(() => {
    const selectedDateYear = state.date.getFullYear()

    if (Number(state.year) !== selectedDateYear) {
      return state.year.toString()
    }

    return selectedDateYear.toString()
  })

  const $toggle = (): boolean => (state.isDate = !state.isDate)

  const $confirmHandler = (): void => {
    state.isDate = true

    const tempDate = new Date(state.date)
    tempDate.setHours(...state.time.split(':'))

    let date: any = DateTime.fromISO(tempDate.toISOString())

    state.fullDate = date.toFormat(
      dateOnly ? DateFormat.DATE : DateFormat.FULL_DATE,
    )

    if (modelModifiers?.utc) {
      date = date.toUTC()
    }

    emits('update:modelValue', date.toISO())

    close()
  }

  const $clear = (): void => {
    setDefaultDate(true)

    emits('update:modelValue', state.fullDate)
  }

  watch(isOpen, (value) => {
    document.children[0].classList[value ? 'add' : 'remove'](
      'tw-overflow-y-hidden',
    )
  })

  return {
    state,
    isOpen,
    titleAsYear,
    $toggle,
    $confirmHandler,
    $clear,
    open,
    close,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
