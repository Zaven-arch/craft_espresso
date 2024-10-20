import type { RuntimeConfig } from 'nuxt/schema'

import {
  Colors, ProductType, Status,
} from '~/enums'

import type { IStatusChip } from '~/interfaces'

import { $getColor } from '~/utils'

export interface IProductCardProps {
  checkboxState: any
  id: string
  name: string
  image: string
  type?: ProductType
  smallPrice: number
  bigPrice: number
  status?: Extract<Status, Status.DISABLE | Status.ENABLE>
}

export const defaultProps = {
  checkboxState: () => ({}),
  id: '',
  name: '',
  price: 0,
}

export const useProductCardComponent = ({
  type, status, image,
}: IProductCardProps) => {
  const {
    public: { storageUrl },
  }: RuntimeConfig = useRuntimeConfig()

  const cardType: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (type) {
      case ProductType.TEA:
        return {
          text: 'PRODUCTS.TYPE.TEA',
          textColor: 'white',
          color: '!tw-bg-app-yellow-light',
        }
      case ProductType.COFFEE:
        return {
          text: 'PRODUCTS.TYPE.COFFEE',
          textColor: 'white',
          color: '!tw-bg-app-primary-black',
        }
      case ProductType.FRESH:
        return {
          text: 'PRODUCTS.TYPE.FRESH',
          textColor: 'white',
          color: '!tw-bg-app-orange',
        }
      default:
        return {
          text: 'PRODUCTS.TYPE.OTHER',
          textColor: 'white',
          color: '!tw-bg-app-grey-font',
        }
    }
  })

  const cardStatus: ComputedRef<IStatusChip | null> = computed<IStatusChip | null>(() => {
    switch (status) {
      case Status.DISABLE:
        return {
          text: 'STATUS.DISABLE',
          textColor: 'white',
          color: '!tw-bg-app-primary-red',
        }
      case Status.ENABLE:
        return {
          text: 'STATUS.ENABLE',
          textColor: 'white',
          color: '!tw-bg-app-green',
        }
      default:
        return null
    }
  })

  const photo: ComputedRef<string> = computed<string>(
    () => (image
      ? `${storageUrl}/${image}`
      : '/images/empty.png'),
  )

  return {
    cardStatus,
    cardType,
    photo,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
