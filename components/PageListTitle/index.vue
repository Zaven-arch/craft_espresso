<template>
  <v-card variant="flat" rounded="0">
    <v-card-title class="!tw-flex !tw-items-center !tw-py-4">
      <div class="tw-flex">
        <slot name="prepend" />
      </div>
      <div
        class="tw-grow tw-text-lg tw-font-semibold tw-text-app-gun-powder-light"
      >
        <slot name="title" />
      </div>
      <div class="tw-ml-auto">
        <slot name="append" />
      </div>
    </v-card-title>
    <v-card-text v-if="!titleOnly">
      <div class="tw-overflow-x-auto">
        <v-sheet
          :color="bgColor"
          :min-width="minWidth"
          class="tw-py-2 tw-px-3 !tw-flex !tw-items-center"
        >
          <div :class="checkboxClass">
            <slot name="checkbox">
              <v-checkbox
                v-model="checkboxState.isAll"
                :ripple="false"
                :disabled="disabled"
                :indeterminate="indeterminate"
                :color="checkboxColor"
                hide-details
                density="compact"
                true-icon="mdi-checkbox-outline"
                class="app-checkbox"
                @update:model-value="$emit('onCheckboxChange', $event)"
              />
            </slot>
          </div>
          <v-sheet width="100%" color="transparent">
            <slot name="titleItems" />
          </v-sheet>
        </v-sheet>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import {
  usePageListTitleComponent, defaultProps, type IEmits, type IPageListTitleProps,
} from './index.script'

withDefaults(
  defineProps<Partial<IPageListTitleProps>>(),
  defaultProps,
)

defineEmits<IEmits>()

const { bgColor, checkboxColor } = usePageListTitleComponent()
</script>
