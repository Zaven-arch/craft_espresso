import { Colors } from '~/enums'

import { $getColor } from '~/utils'

export interface ICashboxPriceBoxProps {
  price: number
}

export const defaultProps = {
  price: 0,
}

export const useCashboxPriceBoxComponent = (props: ICashboxPriceBoxProps) => {
  const { price }: ToRefs<ICashboxPriceBoxProps> = toRefs(props)

  const change: Ref<number| string> = ref<number| string>('')

  const changeResult: ComputedRef<number> = computed<number>(
    () => {
      if (!change.value) {
        return 0
      }

      return Number(change.value) - price.value
    },
  )

  return {
    change,
    changeResult,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
