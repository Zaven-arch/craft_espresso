<template>
  <v-row>
    <v-col cols="6">
      <v-row>
        <v-col cols="12" class="tw-mb-16">
          <cashbox-price-box :key="state.key" :price="price" />
        </v-col>
        <v-col cols="12">
          <div>
            <span
              class="tw-font-semibold tw-text-app-gun-powder-light tw-text-lg"
              v-text="$t('CASHBOX.ADD_MEMO')"
            />
          </div>
          <v-textarea
            v-model.trim="state.form.memo"
            :color="color"
            :base-color="color"
            :bg-color="lightBlue"
            variant="outlined"
            density="compact"
            no-resize
            role="button"
            hide-details
            class="[&_textarea]:tw-caret-black [&_div>*]:!tw-rounded-none tw-mt-2
            [&_textarea]:tw-h-[calc(100vh_-_434px)]"
          />
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="4">
              <v-btn
                :color="color"
                :variant="isCreditCard ? 'tonal' : 'outlined'"
                block
                rounded="0"
                size="x-large"
                elevation="0"
                class="!tw-bg-white"
                @click="togglePaymentMethod"
              >
                <svgo-payment-card-types width="100" />
              </v-btn>
            </v-col>
            <v-col cols="8">
              <v-btn
                :color="color"
                :loading="loading"
                block
                size="x-large"
                rounded="0"
                variant="elevated"
                elevation="0"
                class="!tw-normal-case !tw-text-white !tw-text-xl"
                @click="onSubmitHandler"
              >
                {{ $t('CASHBOX.ORDER') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-card variant="flat" tile :color="color">
        <v-card-title
          class="!tw-text-app-grey-lighter !tw-text-2xl !tw-font-semibold
          !tw-py-3 tw-shadow-title-inset tw-select-none"
          v-text="$t('CASHBOX.PRODUCTS')"
        />
      </v-card>
      <v-row class="!tw-my-0">
        <v-col v-for="item in productTypeItems" :key="item.value">
          <v-btn
            :color="color"
            :variant="isTypeEqual(item.value) ? 'elevated' : 'tonal'"
            :class="{ '!tw-text-white': isTypeEqual(item.value) }"
            block
            height="50"
            class="!tw-normal-case !tw-font-semibold !tw-text-lg"
            @click="setProductType(item.value)"
          >
            {{ item.text }}
          </v-btn>
        </v-col>
      </v-row>
      <v-card
        :color="color"
        tile
        variant="flat"
        height="calc(100vh - 235px)"
        class="!tw-overflow-y-auto !tw-shadow-products-inset"
      >
        <v-card-text
          :class="{
            'tw-min-h-full tw-grid tw-place-items-center':
              pending || !productsState.data?.length,
          }"
        >
          <v-row>
            <v-scale-transition leave-absolute hide-on-leave>
              <v-col v-if="pending">
                <page-loading scale="0.75" height="50" />
              </v-col>
            </v-scale-transition>
            <v-col
              v-for="product in productsState.data"
              :key="`product-${product.id}`"
              cols="3"
            >
              <cashbox-product-card
                :id="product.id"
                v-model="state.products"
                :image="product.image"
                :text="product.name || undefined"
              />
            </v-col>
            <v-scale-transition leave-absolute hide-on-leave>
              <v-col v-if="!pending && !productsState.data?.length">
                <empty-data
                  src="/images/empty.png"
                  class="!tw-bg-transparent [&>div]:tw-min-w-[200px]"
                />
              </v-col>
            </v-scale-transition>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useCashboxPage } from './cashbox/index.script'

definePageMeta({
  middleware: ['only-authorized-middleware'],
})

const {
  color,
  productTypeItems,
  setProductType,
  isTypeEqual,
  isCreditCard,
  onSubmitHandler,
  pending,
  productsState,
  state,
  price,
  lightBlue,
  togglePaymentMethod,
  loading,
} = useCashboxPage()
</script>
