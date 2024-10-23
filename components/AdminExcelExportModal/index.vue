<template>
  <modal-window :key="modal" :modal="modal" @close="$emit('close')">
    <template #title>
      <span class="tw-text-app-gun-powder-light tw-text-2xl">
        <slot name="title">
          {{ $t('ACTIONS_MODAL.EXCEL.TITLE') }}
        </slot>
      </span>
    </template>
    <template #body>
      <v-row justify="center" class="tw-mb-5 sm:!tw-mb-10">
        <v-col cols="12" md="10" lg="8">
          <v-col cols="12" class="tw-text-center tw-my-3 sm:!tw-my-5">
            <span
              class="tw-text-app-gun-powder-light tw-text-xl tw-font-semibold"
              v-text="$t('ACTIONS_MODAL.EXCEL.DETAIL')"
            />
          </v-col>
          <v-row class="tw-py-2" justify="center">
            <v-col cols="12" sm="5" class="!tw-py-1">
              <date-time-modal
                v-model="
                  state.startDate
                "
              >
                <template #field="{ open, clear, date }">
                  <v-text-field
                    :value="date"
                    :placeholder="$t('FILTER.FIELD.START_END', 1)"
                    readonly
                    clearable
                    hide-details
                    role="button"
                    variant="solo"
                    density="compact"
                    class="tw-mt-2 [&>div>div]:tw-rounded-none app-clearable-icon"
                    @click="open"
                    @click:clear="clear"
                  />
                </template>
              </date-time-modal>
            </v-col>
            <v-col
              v-if="$vuetify.display.smAndUp"
              cols="auto"
              class="!tw-px-0"
            >
              <v-icon size="10">
                mdi-tilde
              </v-icon>
            </v-col>
            <v-col cols="12" sm="5" class="!tw-py-1">
              <date-time-modal
                v-model="
                  state.endDate
                "
              >
                <template #field="{ open, clear, date }">
                  <v-text-field
                    :value="date"
                    :placeholder="$t('FILTER.FIELD.START_END', 0)"
                    readonly
                    clearable
                    hide-details
                    role="button"
                    variant="solo"
                    density="compact"
                    class="tw-mt-2 [&>div>div]:tw-rounded-none app-clearable-icon"
                    @click="open"
                    @click:clear="clear"
                  />
                </template>
              </date-time-modal>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template #actions>
      <v-row justify="center" class="tw-pb-7">
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :color="color"
            width="175"
            size="large"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="$emit('close')"
          >
            {{ $t('ACTIONS_MODAL.EXCEL.BUTTON', 1) }}
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
            width="175"
            size="large"
            variant="elevated"
            class="!tw-normal-case !font-normal !tw-text-white !tw-text-lg"
            @click="$emit('onDownload', state)"
          >
            {{ $t('ACTIONS_MODAL.EXCEL.BUTTON', 0) }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import {
  useAdminExcelExportModalComponent,
  type IEmits,
  type IAdminExcelExportModalProps,
  defaultProps,
} from './index.script'

withDefaults(defineProps<IAdminExcelExportModalProps>(), defaultProps)

defineEmits<IEmits>()

const { color, state } = useAdminExcelExportModalComponent()
</script>
