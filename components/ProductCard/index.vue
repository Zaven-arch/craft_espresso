<template>
  <v-card variant="flat" rounded="0">
    <v-card-text>
      <v-sheet
        class="!tw-px-3 !tw-grid !tw-grid-cols-[28px_36px_1fr_150px_repeat(3,_130px)]
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
        <v-img :src="photo" contain height="36" />
        <span class="tw-truncate" v-text="name" />
        <div class="tw-grid tw-gap-1">
          <div class="tw-justify-center tw-flex tw-items-center tw-gap-0.5 tw-ml-4">
            <span v-number-format="smallPrice" />
            <svgo-dram-icon width="16" />
          </div>
          <div class="tw-justify-center tw-flex tw-items-center tw-gap-0.5 tw-ml-4">
            <span v-number-format="bigPrice" />
            <svgo-dram-icon width="16" />
          </div>
        </div>
        <div>
          <v-chip
            v-if="cardType"
            :color="cardType?.textColor"
            :class="cardType?.color"
            class="app-status-chip"
          >
            <span v-text="$t(cardType?.text)" />
          </v-chip>
        </div>
        <div>
          <v-chip
            v-if="cardStatus"
            :color="cardStatus?.textColor"
            :class="cardStatus?.color"
            class="app-status-chip"
          >
            <span class="tw-truncate tw-max-w-[100px]" v-text="$t(cardStatus?.text)" />
          </v-chip>
        </div>
        <div>
          <slot name="actionButton" />
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type IProductCardProps, defaultProps, useProductCardComponent } from './index.script'

const props = withDefaults(
  defineProps<Partial<IProductCardProps>>(),
  defaultProps,
)

const {
  color, cardStatus, cardType, photo,
} = useProductCardComponent(props)
</script>
