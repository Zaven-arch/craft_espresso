<template>
  <v-pagination
    v-model="page"
    :size="size"
    :active-color="color"
    :length="length"
    :rounded="rounded"
    :density="density"
    :variant="variant"
    :elevation="elevation"
    :total-visible="totalVisible"
    current-page-aria-label="current"
    border
    class="[&_button]:tw-border-[#e8e9eC] [&_button]:tw-bg-white
    [&_button]:tw-text-app-gun-powder-light
    [&_[aria-label=current]>span:first-child]:!tw-opacity-100
    [&_[aria-label=current]>span:last-child]:tw-z-10
    [&_[aria-label=current]>span:last-child]:tw-text-white"
    @input="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
import {
  usePaginationComponent,
  defaultProps,
  type IPaginationProps,
  type IEmits,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IPaginationProps>>(),
  defaultProps,
)

const emits = defineEmits<IEmits>()

const { page } = usePaginationComponent(props, emits)
</script>
