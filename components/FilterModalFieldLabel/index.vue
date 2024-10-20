<template>
  <div>
    <span class="tw-text-app-grey tw-font-bold tw-text-base" v-text="label" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defaultProps, type IFilterModalFieldLabelProps } from './index.script'

withDefaults(
  defineProps<Partial<IFilterModalFieldLabelProps>>(),
  defaultProps,
)
</script>
