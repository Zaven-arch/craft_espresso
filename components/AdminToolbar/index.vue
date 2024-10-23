<template>
  <v-row class="tw-flex tw-flex-wrap">
    <v-col v-if="filter" cols="auto" class="tw-pr-0">
      <v-btn
        :color="color"
        :size="$vuetify.display.smAndUp ? 'large' : 'default'"
        class="!tw-normal-case !tw-font-normal !tw-px-3
        [&>span:nth-child(3)]:tw-grow !tw-bg-white !tw-flex"
        width="100"
        variant="outlined"
        @click="$emit('onFilter')"
      >
        <div class="tw-flex tw-justify-between tw-grow tw-items-center">
          <span v-text="$t('TOOLBAR.FILTER')" />
          <v-icon icon="mdi-filter-outline" size="18" />
        </div>
      </v-btn>
    </v-col>
    <v-col v-if="actions" cols="auto">
      <admin-action-button
        :large="$vuetify.display.smAndUp"
        :items="actionItems"
        nudge-width="150"
        nudge-left="0"
        @on-change="$emit('onAction', $event)"
      />
    </v-col>
    <slot name="begin" />
    <v-spacer />
    <slot name="end" />
  </v-row>
</template>

<script lang="ts" setup>
import {
  useAdminToolbarComponent,
  defaultProps,
  type IEmits,
  type IAdminToolbarProps,
} from './index.script'

withDefaults(defineProps<Partial<IAdminToolbarProps>>(), defaultProps)

defineEmits<IEmits>()

const { color } = useAdminToolbarComponent()
</script>
