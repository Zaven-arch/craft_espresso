<template>
  <v-card tile :color="color" class="!tw-shadow-title-inset tw-select-none">
    <v-card-title
      class="tw-text-white !tw-text-4xl tw-justify-between !tw-flex tw-items-end !tw-p-3"
    >
      <span class="tw-text-sm" v-text="$t('CASHBOX.NEED_TO_PAY')" />
      <div class="tw-flex tw-items-center tw-gap-2">
        <span v-text="$numberFormat(price)" />
        <svgo-dram-icon class="tw-w-7 [&>*]:!tw-fill-white" />
      </div>
    </v-card-title>
    <v-divider class="tw-mx-3" />
    <v-card-title
      class="tw-text-white !tw-text-4xl tw-justify-between !tw-flex tw-gap-3 !tw-p-3"
    >
      <span class="tw-text-sm tw-w-28" v-text="$t('CASHBOX.GIVE_CHANGE')" />
      <input
        v-model="change"
        class="tw-border-b tw-text-lg tw-border-solid tw-outline-0
        tw-cursor-pointer tw-grow"
      >
      <div class="tw-flex tw-items-center tw-gap-2 tw-text-right">
        <span class="tw-min-w-24" v-text="$numberFormat(changeResult)" />
        <svgo-dram-icon class="tw-w-7 [&>*]:!tw-fill-white" />
      </div>
    </v-card-title>
  </v-card>
</template>

<script  lang="ts" setup>
import { useCashboxPriceBoxComponent, type ICashboxPriceBoxProps, defaultProps } from './index.script'

const props = withDefaults(
  defineProps<ICashboxPriceBoxProps>(),
  defaultProps,
)

const { color, change, changeResult } = useCashboxPriceBoxComponent(props)
</script>
