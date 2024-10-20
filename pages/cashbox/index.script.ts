import {
  Colors, PaymentMethod, ProductType, Status,
} from '~/enums'

import type {
  IOrder, IProduct, IUseLoading, IUseSnackbar, IOrderProducts,
} from '~/interfaces'

import { ProductsService, OrdersService, OrderProductsService } from '~/services'

import { $getColor, $generateOrder } from '~/utils'

export const useCashboxPage = () => {
  const { t } = useI18n()

  const {
    state: productsState,
    setType,
    setData,
  } = useProducts()

  const { state: ordersState } = useOrders()

  const state: any = reactive({
    type: ProductType.COFFEE,
    products: {},
    key: false,
    form: {
      memo: '',
      payment_method: PaymentMethod.FIAT,
    },
  })

  const { loading, setLoading }: IUseLoading = useLoading()
  const { loading: pending, setLoading: setPending }: IUseLoading = useLoading()

  const { $open }: IUseSnackbar = useSnackbar()

  const {
    getList,
  } = new ProductsService()

  const { create: createOrder } = new OrdersService()

  const { create: createOrderProducts } = new OrderProductsService()

  const onGetListData = async () => {
    try {
      setData([])

      setPending(true)

      const { data } = await getList({
        type: productsState.value.type,
        status: Status.ENABLE,
        limit: 100,
        page: 1,
      })

      data.forEach((item: IProduct) => {
        if (state.products[item.id as any]) {
          return
        }

        state.products[item.id as any] = {
          small_price: item.small_price,
          big_price: item.big_price,
        }
      })

      setData(data ?? [])
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setPending(false)
    }
  }

  const price = computed(() => Object.entries(state.products).reduce(
    (sum: number, item: any[]) => {
      if (!item[1].isSelected) {
        return sum
      }

      if (item[1].big_count) {
        sum += item[1].big_price * item[1].big_count
      }

      if (item[1].small_count) {
        sum += item[1].small_price * item[1].small_count
      }

      return sum
    },
    0,
  ))

  watch(() => state.type, async (value: ProductType) => {
    setType(value)

    await onGetListData()
  }, { immediate: true })

  const productTypeItems: any[] = Object
    .entries(ProductType)
    .map(([key, value]) => ({
      text: t(`PRODUCTS.TYPE.${key}`),
      value,
    }))

  const setProductType = (value: ProductType) => (state.type = value)

  const isTypeEqual = (value: ProductType): boolean => state.type === value

  const isCreditCard: ComputedRef<boolean> = computed<boolean>(
    () => state.form.payment_method === PaymentMethod.CREDIT_CARD,
  )

  const togglePaymentMethod = () => {
    state.form.payment_method = isCreditCard.value
      ? PaymentMethod.FIAT
      : PaymentMethod.CREDIT_CARD
  }

  const onSubmitHandler = async () => {
    try {
      setLoading(true)

      let order: string = $generateOrder()

      while (ordersState.value.orderSet.has(order)) {
        order = $generateOrder()
      }

      ordersState.value.orderSet.add(order)

      const orderPayload: IOrder = {
        ...state.form,
        status: Status.WAIT,
        is_paid: 'NO',
        price: price.value,
        order,
      }

      const [data] = await createOrder(orderPayload)

      const rawProducts = Object.entries(state.products)

      const orderProductsPayload: IOrderProducts[] = rawProducts
        .filter(
          ([, item]: any) => item.isSelected,
        )
        .map(
          ([productId, item]: any) => ({
            order_id: data.id,
            product_id: productId,
            small_count: item.small_count,
            big_count: item.big_count,
          }),
        )

      await createOrderProducts(orderProductsPayload)

      rawProducts.forEach(([, item]: any) => {
        item.isSelected = false
      })

      state.form = {
        memo: '',
        payment_method: PaymentMethod.FIAT,
      }

      state.key = !state.key
    } catch (e: any) {
      $open(Colors.PRIMARY_RED, e.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    price,
    state,
    pending,
    loading,
    productsState,
    isCreditCard,
    isTypeEqual,
    setProductType,
    productTypeItems,
    togglePaymentMethod,
    onSubmitHandler,
    lightBlue: $getColor(Colors.LIGHT_BLUE),
    color: $getColor(Colors.PRIMARY_RED),
  }
}
