<template>
  <modal-window :key="isOpen" :modal="isOpen" max-width="1000" @close="close">
    <template #title>
      <span
        class="tw-text-app-gun-powder-light tw-text-2xl"
        v-text="$t('PRODUCTS.ADD_MODAL.TITLE', state.isEdit)"
      />
    </template>
    <template #body>
      <v-scale-transition>
        <page-loading v-if="pending" height="300" />
      </v-scale-transition>
      <v-row v-if="!pending" justify="center" class="!tw-my-1">
        <v-col cols="12" sm="10">
          <v-row class="!tw-my-0">
            <v-col cols="4">
              <choose-file
                v-model="state.form.image"
                :accept="accept"
                min-height="194"
              >
                <template #uploaded="{ files, onDeleteHandler }">
                  <v-col v-for="file in files" :key="file.name" cols="12">
                    <div>
                      <uploaded-picture-card
                        :file="file"
                        aspect-ratio="2"
                        contain
                        @on-delete="onDeleteHandler(file)"
                      />
                    </div>
                  </v-col>
                </template>
              </choose-file>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model.trim="state.form.name"
                    :color="color"
                    :label="$t('PRODUCTS.ADD_MODAL.FIELD.NAME')"
                    hide-details
                    role="button"
                    density="comfortable"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.trim.number="state.form.small_price"
                    :color="color"
                    :label="$t('PRODUCTS.ADD_MODAL.FIELD.SMALL_PRICE')"
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
                  <v-text-field
                    v-model.trim.number="state.form.big_price"
                    :color="color"
                    :label="$t('PRODUCTS.ADD_MODAL.FIELD.BIG_PRICE')"
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
                  <v-select
                    v-model.trim="state.form.type"
                    :items="typeItems"
                    :color="color"
                    :label="$t('PRODUCTS.ADD_MODAL.FIELD.TYPE')"
                    hide-details
                    role="button"
                    density="comfortable"
                    variant="outlined"
                    item-title="text"
                    item-value="value"
                    menu-icon="mdi-chevron-down"
                  />
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model.trim="state.form.status"
                    :items="statusItems"
                    :color="color"
                    :label="$t('PRODUCTS.ADD_MODAL.FIELD.STATUS')"
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
        </v-col>
      </v-row>
    </template>
    <template #actions>
      <v-row v-if="!pending" justify="center" class="tw-pb-7">
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
  useProductDataModalComponent,
  defaultProps,
  type IProductDataModalProps,
  type IEmits,
} from './index.script'

withDefaults(defineProps<IProductDataModalProps>(), defaultProps)

defineEmits<IEmits>()

const {
  color, isOpen, close, state, typeItems, statusItems, accept, pending,
} = useProductDataModalComponent()
</script>
