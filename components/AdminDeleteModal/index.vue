<template>
  <modal-window :key="modal" :modal="modal" @close="$emit('close')">
    <template #title>
      <span class="tw-text-app-gun-powder-light tw-text-2xl">
        <slot name="title">
          {{ $t('ACTIONS_MODAL.DELETE.TITLE') }}
        </slot>
      </span>
    </template>
    <template #body>
      <div
        class="tw-text-center tw-text-lg tw-text-app-gun-powder-light tw-my-5 sm:tw-my-12"
      >
        <slot name="body">
          {{ $t('ACTIONS_MODAL.DELETE.CONFIRMATION') }}
        </slot>
      </div>
    </template>
    <template #actions>
      <v-row justify="center" class="tw-pb-7">
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :color="color"
            size="large"
            min-width="175"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="$emit('close')"
          >
            {{ $t('ACTIONS_MODAL.DELETE.BUTTON', 1) }}
          </v-btn>
        </v-col>
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :loading="loading"
            :color="color"
            :class="$vuetify.display.width < 425 ? 'tw-mt-3' : 'tw-ml-3'"
            flat
            size="large"
            min-width="175"
            variant="elevated"
            class="!tw-normal-case !font-normal !tw-text-white !tw-text-lg tw-ml-0"
            @click="$emit('onDelete')"
          >
            <slot name="button">
              {{ $t('ACTIONS_MODAL.DELETE.BUTTON', 0) }}
            </slot>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import {
  useAdminDeleteModalComponent,
  defaultProps,
  type IAdminDeleteModalProps,
  type IEmits,
} from './index.script'

withDefaults(defineProps<Partial<IAdminDeleteModalProps>>(), defaultProps)

defineEmits<IEmits>()

const { color } = useAdminDeleteModalComponent()
</script>
