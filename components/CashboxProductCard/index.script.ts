import type { RuntimeConfig } from 'nuxt/schema'

import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface ICashboxProductCardComponentProps {
  modelValue: any
  id: string
  image: string
  text: string
}

export const defaultProps = {
  id: '',
  image: '',
  text: '&mdash;',
}

export const useCashboxProductCardComponent = (
  { image, modelValue, id }: ICashboxProductCardComponentProps,
) => {
  const {
    public: { storageUrl },
  }: RuntimeConfig = useRuntimeConfig()

  const state: WritableComputedRef<any> = computed({
    get() {
      return modelValue[id]
    },
  })

  const countProp: ComputedRef<string> = computed<string>(
    () => (state.value.isBig ? 'big_count' : 'small_count'),
  )

  const onToggleIsSelected = () => (state.value.isSelected = !state.value.isSelected)

  const onAdd = () => (state.value[countProp.value] += 1)

  const onRemove = () => {
    if ((state.value[countProp.value] - 1) >= 0) {
      state.value[countProp.value] -= 1
    }

    if (state.value.small_count <= 0 && state.value.big_count <= 0) {
      return onToggleIsSelected()
    }
  }

  watch(() => state.value.isSelected, (value: boolean) => {
    if (value) {
      return
    }

    state.value.small_count = 0
    state.value.big_count = 0
  }, { immediate: true })

  const photo: ComputedRef<string> = computed<string>(
    () => (image
      ? `${storageUrl}/${image}`
      : '/images/empty.png'),
  )

  const onToggleIsBig = () => (state.value.isBig = !state.value.isBig)

  return {
    state,
    photo,
    countProp,
    onAdd,
    onRemove,
    onToggleIsSelected,
    onToggleIsBig,
    color: $getColor(Colors.PRIMARY_RED),
    primaryBlack: $getColor(Colors.PRIMARY_BLACK),
  }
}
