<template>
  <modal-window :key="modal" :modal="modal" @close="$emit('close')">
    <template #title>
      <span class="tw-text-app-gun-powder-light tw-text-2xl">
        <slot name="title" />
      </span>
    </template>
    <template #body>
      <slot name="body">
        <v-radio-group
          v-model="radio"
          inline
          hide-details
          density="compact"
          class="tw-mt-0 tw-pt-0 [&>div>div]:tw-gap-5"
        >
          <v-row
            justify="center"
            align="center"
            class="!tw-my-3 sm:!tw-my-14 tw-gap-1"
          >
            <v-col
              v-for="item in items"
              :key="item.value"
              cols="auto"
              class="tw-flex tw-justify-center"
            >
              <label role="button" class="tw-flex tw-items-center tw-flex-col">
                <span
                  class="tw-text-lg tw-capitalize tw-text-app-gun-powder-light"
                  v-text="item.text"
                />
                <v-radio :value="item.value" :ripple="false" :color="color" />
              </label>
            </v-col>
          </v-row>
        </v-radio-group>
      </slot>
    </template>
    <template #actions>
      <v-row justify="center" class="tw-pb-7">
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :color="color"
            min-width="175"
            size="large"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="$emit('close')"
          >
            <slot name="closeButton">
              {{ $t('ACTIONS_MODAL.CHANGE.BUTTON', 1) }}
            </slot>
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
            min-width="175"
            size="large"
            variant="elevated"
            class="!tw-normal-case !font-normal !tw-text-white !tw-text-lg"
            @click="$emit('onChange', radio)"
          >
            <slot name="button">
              {{ $t('ACTIONS_MODAL.CHANGE.BUTTON', 0) }}
            </slot>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import {
  useAdminChangesModalComponent,
  defaultProps,
  type IEmits,
  type IAdminChangesModalProps,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IAdminChangesModalProps>>(),
  defaultProps,
)

defineEmits<IEmits>()

const { color, radio } = useAdminChangesModalComponent(
  props,
)
</script>
