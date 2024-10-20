<template>
  <v-card variant="flat" rounded="0">
    <v-card-text>
      <v-sheet
        class="!tw-px-3 !tw-grid !tw-grid-cols-[28px_1fr_100px_150px_repeat(2,_130px)]
        tw-items-start !tw-text-app-gun-powder-light tw-text-base tw-gap-3"
      >
        <div>
          <v-checkbox
            v-model="checkboxState.value"
            :value="id"
            :ripple="false"
            :color="color"
            hide-details
            density="compact"
            class="app-checkbox"
            true-icon="mdi-checkbox-outline"
          />
        </div>
        <div class="tw-grid tw-gap-1">
          <div
            v-for="product in products"
            :key="`product-details-${product.id}`"
            class="tw-flex tw-items-start tw-justify-between"
          >
            <div class="tw-flex tw-items-center tw-gap-0.5 tw-grow">
              <div>
                <v-img
                  :src="product.image
                    ? `${storageUrl}/${product.image}`
                    : '/images/empty.png'"
                  contain
                  width="18"
                  height="18"
                />
              </div>
              <div class="tw-max-w-[350px] tw-truncate">
                <span class="tw-font-semibold" v-text="product.name" />
              </div>
            </div>
            <div class="tw-grid tw-w-[111px]">
              <div class="tw-flex tw-items-center tw-gap-1 tw-justify-between">
                <span class="tw-flex tw-items-center tw-text-sm tw-gap-0.5">
                  <span v-text="$numberFormat(product.small_price)" />
                  <svgo-dram-icon class="tw-w-3.5" />
                </span>
                /
                <span class="tw-flex tw-items-center tw-text-sm tw-gap-0.5">
                  <span v-text="$numberFormat(product.big_price)" />
                  <svgo-dram-icon class="tw-w-3.5" />
                </span>
              </div>
              <div class="tw-flex tw-items-center tw-gap-1 tw-justify-between">
                <span
                  class="tw-grow tw-text-center tw-pr-2.5"
                  v-html="product.small_count ? `x${product.small_count}` : '&mdash;'"
                />
                /
                <span
                  class="tw-grow tw-text-center tw-pr-2.5"
                  v-html="product.big_count ? `x${product.big_count}` : '&mdash;'"
                />
              </div>
            </div>
          </div>
        </div>
        <span class="tw-font-semibold tw-text-lg tw-text-center" v-text="order" />
        <div
          class="tw-justify-center tw-font-semibold tw-text-lg tw-flex tw-items-center tw-gap-0.5
          tw-ml-4"
        >
          <span v-text="$numberFormat(price)" />
          <svgo-dram-icon width="16" />
        </div>
        <div class="tw-relative">
          <v-chip
            v-if="cardStatus"
            :color="cardStatus?.textColor"
            :class="cardStatus?.color"
            class="app-status-chip"
          >
            <span class="tw-truncate tw-max-w-[100px]" v-text="$t(cardStatus?.text)" />
          </v-chip>
          <svgo-paid-icon v-if="isPaidIcon" class="tw-w-6 tw-absolute tw-top-1.5 tw-right-1" />
        </div>
        <div>
          <slot name="actionButton" />
        </div>
        <div
          v-if="memo"
          class="tw-col-span-full"
        >
          <admin-card-description
            :label="$t('ORDERS.ADMIN_MEMO')"
            :description="memo"
            :color="lightBlue"
            text-color="tw-text-sm tw-ml-2"
          />
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type IOrderCardProps, defaultProps, useOrderCardComponent } from './index.script'

const props = withDefaults(
  defineProps<Partial<IOrderCardProps>>(),
  defaultProps,
)

const {
  color, cardStatus, isPaidIcon, storageUrl, lightBlue,
} = useOrderCardComponent(props)
</script>
