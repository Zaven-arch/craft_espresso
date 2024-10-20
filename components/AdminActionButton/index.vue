<template>
  <v-menu
    :min-width="minWidth"
    :width="!items.length ? minWidth : null"
    location="bottom"
    offset="10"
  >
    <template #activator="activator">
      <v-btn
        :size="large ? 'large' : 'default'"
        :color="state?.color"
        :block="block"
        width="110"
        variant="outlined"
        class="!tw-normal-case !tw-font-normal !tw-bg-white !tw-text-base !tw-truncate"
        v-bind="activator.props"
      >
        <span
          class="tw-truncate tw-max-w-[90px]"
          v-text="$t('TOOLBAR.ACTIONS')"
        />
      </v-btn>
    </template>
    <v-sheet v-if="!items.length" elevation="5">
      <slot name="empty">
        <empty-data src="/images/empty.png" max-width="100" />
      </slot>
    </v-sheet>
    <v-list
      v-else
      :selected="state.action"
      @update:selected="state.onChangeHandler"
    >
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :disabled="item.disabled"
        :value="item.value"
      >
        <v-list-item-title v-text="$t(item.name)" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import {
  useAdminActionButtonComponent,
  type IAdminActionButtonProps,
  type IEmits,
  defaultProps,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IAdminActionButtonProps>>(),
  defaultProps,
)
const emits = defineEmits<IEmits>()

const state = useAdminActionButtonComponent(
  props,
  emits,
)
</script>
