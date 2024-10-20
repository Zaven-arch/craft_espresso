<template>
  <v-dialog
    v-model="isOpen"
    :content-class="[
      $vuetify.display.width > 1024 && '!tw-ml-[276px]',
      contentClass,
      'tw-px-6',
    ]"
    :attach="attach"
    :max-width="maxWidth"
    :persistent="persistent"
    width="100%"
    class="!tw-z-[9999]"
    v-bind="$attrs"
  >
    <slot>
      <v-card :color="bgColor" variant="flat" rounded="0">
        <v-card-title class="!tw-pt-4 !tw-pb-2.5 !tw-px-6">
          <slot name="title" />
        </v-card-title>
        <v-card-text class="!tw-pt-0 !tw-pb-5">
          <slot name="body" />
        </v-card-text>
        <v-card-actions
          :class="
            stickyActions
              ? '!tw-sticky !-tw-bottom-px !tw-p-0'
              : '!tw-px-4 !tw-pb-5'
          "
          class="tw-flex tw-items-center tw-justify-center"
        >
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </slot>
  </v-dialog>
</template>

<script lang="ts" setup>
import {
  useModalWindowComponent,
  type IEmits,
  type IModalWindowProps,
  defaultProps,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IModalWindowProps>>(),
  defaultProps,
)
const emits = defineEmits<IEmits>()

const { isOpen } = useModalWindowComponent(
  props,
  emits,
)
</script>
