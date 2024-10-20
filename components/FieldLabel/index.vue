<template>
  <div>
    <div class="tw-flex tw-items-center">
      <span class="tw-mr-2">
        <slot name="label" />
      </span>
      <v-chip
        v-if="labelData"
        :color="labelData?.textColor"
        :class="labelData?.color"
        label
        size="small"
        class="app-status-chip"
      >
        {{ $t(labelData.text) }}
      </v-chip>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  useFieldLabelComponent,
  defaultProps,
  type IFieldLabelProps,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IFieldLabelProps>>(),
  defaultProps,
)

const { labelData } = useFieldLabelComponent(props)
</script>
