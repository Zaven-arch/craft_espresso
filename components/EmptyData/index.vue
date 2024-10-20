<template>
  <v-sheet
    :min-width="minWidth"
    :elevation="elevation"
    class="tw-py-7 sm:tw-p-16 !tw-flex !tw-items-center !tw-flex-col"
  >
    <h3 class="tw-text-center tw--capitalize tw-text-app-gun-powder tw-text-xl">
      <slot />
    </h3>
    <v-img :src="src" :max-width="size" width="100%" height="100%" />
  </v-sheet>
</template>

<script lang="ts" setup>
import { useEmptyDataComponent, defaultProps, type IEmptyDataProps } from './index.script'

const props = withDefaults(
  defineProps<Partial<IEmptyDataProps>>(),
  defaultProps,
)

const { size } = useEmptyDataComponent(props)
</script>
