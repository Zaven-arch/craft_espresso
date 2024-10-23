import type { RuntimeConfig } from 'nuxt/schema'

import { Colors, PaymentMethod, Status } from '~/enums'

import type { IStatusChip } from '~/interfaces'

import type { TIsPaid } from '~/types'

import { $getColor } from '~/utils'

export interface IOrderCardProps {
  checkboxState: any
  id: string
  isPaid: TIsPaid
  paymentMethod: PaymentMethod
  price: number
  order: string
  memo: string
  products: any[]
  status?: Extract<Status, Status.WAIT | Status.DONE>
}

export const defaultProps = {
  checkboxState: () => ({}),
  id: '',
  price: 0,
  order: '',
  memo: '',
  products: () => [],
  isPaid: 'NO' as TIsPaid,
  paymentMethod: PaymentMethod.FIAT,
}

export const useOrderCardComponent = ({
  status,
  isPaid,
  paymentMethod,
}: IOrderCardProps) => {
  const { t } = useI18n()

  const {
    public: { storageUrl },
  }: RuntimeConfig = useRuntimeConfig()

  const cardStatus: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (status) {
      case Status.WAIT:
        return {
          text: 'STATUS.WAIT',
          textColor: 'white',
          color: '!tw-bg-app-yellow-light',
        }
      case Status.DONE:
        return {
          text: 'STATUS.DONE',
          textColor: 'white',
          color: '!tw-bg-app-green',
        }
      default:
        return null
    }
  })

  const isPaidIcon: ComputedRef<boolean> = computed<boolean>(
    () => isPaid === 'YES',
  )

  const paymentMethodText: ComputedRef<string> = computed<string>(() => {
    if (paymentMethod === PaymentMethod.CREDIT_CARD) {
      return t('PAYMENT_METHOD.CREDIT_CARD')
    }

    return t('PAYMENT_METHOD.FIAT')
  })

  return {
    storageUrl,
    cardStatus,
    isPaidIcon,
    paymentMethodText,
    color: $getColor(Colors.PRIMARY_RED),
    lightBlue: $getColor(Colors.LIGHT_BLUE),
  }
}
