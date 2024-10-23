import { Colors, ManagementType } from '~/enums'

import { $getColor, $numberFormat } from '~/utils'

export interface IManagementCardProps {
  checkboxState: any
  id: string
  name: string
  type: string
  price: number
  quantity: string
  date: string
  isKilogram: boolean
  isGram: boolean
}

export const defaultProps = {
  checkboxState: () => ({}),
  id: '',
  name: '',
  type: '',
  price: 0,
  quantity: '',
  date: '',
  isKilogram: false,
  isGram: false,
}

const InputIcon = defineAsyncComponent(
  () => import('~/assets/svg/input-icon.svg'),
)
const OutputIcon = defineAsyncComponent(
  () => import('~/assets/svg/output-icon.svg'),
)

export const useManagementCardComponent = ({
  type,
  quantity,
  isGram,
  isKilogram,
}: IManagementCardProps) => {
  const { t } = useI18n()

  const iconType: ComputedRef<string> = computed<string>(() => {
    switch (type) {
      case ManagementType.OUTPUT:
        return 'OutputIcon'
      case ManagementType.INPUT:
        return 'InputIcon'
      default:
        return ''
    }
  })

  const qty: ComputedRef<string> = computed<string>(() => {
    if (isGram) {
      return `${$numberFormat(quantity)} ${t('WEIGHT.GRAM')}`
    }

    if (isKilogram) {
      return `${$numberFormat(quantity)} ${t('WEIGHT.KILOGRAM')}`
    }

    return $numberFormat(quantity)
  })

  return {
    iconType,
    qty,
    icons: {
      InputIcon,
      OutputIcon,
    },
    color: $getColor(Colors.PRIMARY_RED),
  }
}
