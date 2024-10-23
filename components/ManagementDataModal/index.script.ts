/* eslint-disable no-unused-vars */

import { Colors, ManagementType } from '~/enums'

import { $getColor } from '~/utils'

export interface IManagementDataModalProps {
  loading: boolean
}

export type IEmits = (e: 'onSubmit', value: any) => void

export const defaultProps = {
  loading: false,
}

export const useManagementDataModalComponent = () => {
  const { t } = useI18n()

  const { dataModal, state: managementState, setActiveData } = useManagement()

  const state: any = reactive({
    isEdit: false,
    form: {},
  })

  watch(
    dataModal.isOpen,
    (value: boolean) => {
      if (!value) {
        setActiveData()

        return (state.form = {})
      }

      if (!managementState.value.active) {
        return
      }

      state.isEdit = true

      state.form = {
        ...managementState.value.active,
      }
    },
    { immediate: true },
  )

  const typeItems: any[] = Object.entries(ManagementType).map(
    ([key, value]) => ({
      text: t(`MANAGEMENT.TYPE.${key}`),
      value,
    }),
  )

  const onGramHandler = () => {
    state.form.is_gram = !state.form.is_gram
    state.form.is_kilogram = false
  }

  const onKilogramHandler = () => {
    state.form.is_kilogram = !state.form.is_kilogram
    state.form.is_gram = false
  }

  const allowDates = (date: any): boolean => date <= new Date()

  return {
    state,
    allowDates,
    typeItems,
    isOpen: dataModal.isOpen,
    close: dataModal.close,
    onGramHandler,
    onKilogramHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
