<template>
  <v-card variant="flat" rounded="0">
    <v-card-text>
      <v-sheet
        class="!tw-px-3 !tw-grid !tw-grid-cols-[28px_1fr_repeat(3,_150px)_50px_130px]
        tw-items-center !tw-text-app-gun-powder-light tw-text-base tw-gap-3"
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
        <span class="tw-truncate" v-text="name" />
        <div class="tw-justify-center tw-flex tw-items-center tw-gap-0.5 tw-ml-4">
          <span v-number-format="price" />
          <svgo-dram-icon width="16" />
        </div>
        <span class="tw-text-center" v-text="qty" />
        <span v-short-date-with-slash="date" class="tw-text-center" />
        <div class="tw-text-center">
          <component :is="icons[iconType]" class="tw-w-10" />
        </div>
        <div>
          <slot name="actionButton" />
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type IManagementCardProps, defaultProps, useManagementCardComponent } from './index.script'

const props = withDefaults(
  defineProps<Partial<IManagementCardProps>>(),
  defaultProps,
)

const {
  color, iconType, icons, qty,
} = useManagementCardComponent(props)
</script>
