<template>
  <modal-window :key="isOpen" :modal="isOpen" max-width="1000" @close="close">
    <template #title>
      <span
        class="tw-text-app-gun-powder-light tw-text-2xl"
        v-text="$t('MANAGEMENT.ADD_MODAL.TITLE')"
      />
    </template>
    <template #body>
      <v-row justify="center" class="!tw-my-1">
        <v-col cols="12" sm="10">
          <v-row class="!tw-my-0">
            <v-col cols="12">
              <v-text-field
                v-model.trim="state.form.name"
                :color="color"
                :label="$t('MANAGEMENT.ADD_MODAL.FIELD.NAME')"
                hide-details
                role="button"
                density="comfortable"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim.number="state.form.price"
                :color="color"
                :label="$t('MANAGEMENT.ADD_MODAL.FIELD.PRICE')"
                hide-details
                role="button"
                density="comfortable"
                variant="outlined"
              >
                <template #prepend-inner>
                  <svgo-dram-icon width="16" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-row class="-!tw-mr-1">
                <v-col cols="8" class="!tw-pr-0">
                  <v-text-field
                    v-model.trim="state.form.quantity"
                    :color="color"
                    :label="$t('MANAGEMENT.ADD_MODAL.FIELD.QUANTITY')"
                    hide-details
                    role="button"
                    density="comfortable"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="2" class="!tw-pr-1">
                  <v-btn
                    :color="color"
                    :variant="state.form.is_gram ? 'elevated' : 'tonal'"
                    :class="{ '!tw-text-white': state.form.is_gram }"
                    block
                    elevation="0"
                    min-width="48"
                    size="large"
                    class="!tw-normal-case !tw-font-normal !tw-text-lg !tw-h-full"
                    @click="onGramHandler"
                  >
                    {{ $t('WEIGHT.GRAM') }}
                  </v-btn>
                </v-col>
                <v-col cols="2" class="!tw-pl-1">
                  <v-btn
                    :color="color"
                    :variant="state.form.is_kilogram ? 'elevated' : 'tonal'"
                    :class="{ '!tw-text-white': state.form.is_kilogram }"
                    block
                    elevation="0"
                    min-width="48"
                    size="large"
                    class="!tw-normal-case !tw-font-normal !tw-text-lg !tw-h-full"
                    @click="onKilogramHandler"
                  >
                    {{ $t('WEIGHT.KILOGRAM') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <date-time-modal
                v-model="state.form.date"
                :allow-dates="allowDates"
                date-only
              >
                <template #field="{ date, open }">
                  <v-text-field
                    :model-value="date"
                    :color="color"
                    :label="$t('MANAGEMENT.ADD_MODAL.FIELD.DATE')"
                    hide-details
                    readonly
                    role="button"
                    density="comfortable"
                    variant="outlined"
                    @click.stop="open"
                  />
                </template>
              </date-time-modal>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model.trim="state.form.type"
                :items="typeItems"
                :color="color"
                :label="$t('MANAGEMENT.ADD_MODAL.FIELD.TYPE')"
                hide-details
                role="button"
                density="comfortable"
                variant="outlined"
                item-title="text"
                item-value="value"
                menu-icon="mdi-chevron-down"
              />
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
            min-width="175"
            size="large"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="close"
          >
            {{ $t('ACTIONS_MODAL.DATA.BUTTON', 1) }}
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
            @click="$emit('onSubmit', state)"
          >
            {{ $t('ACTIONS_MODAL.DATA.BUTTON', 0) }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import {
  useManagementDataModalComponent,
  defaultProps,
  type IManagementDataModalProps,
  type IEmits,
} from './index.script'

withDefaults(defineProps<IManagementDataModalProps>(), defaultProps)

defineEmits<IEmits>()

const {
  color,
  isOpen,
  close,
  state,
  typeItems,
  onGramHandler,
  onKilogramHandler,
  allowDates,
} = useManagementDataModalComponent()
</script>
