<template>
  <modal-window :key="isOpen" :modal="isOpen" @close="close">
    <template #body>
      <v-row justify="center" class="sm:!tw-py-5">
        <v-col cols="12" sm="11">
          <v-row>
            <v-col cols="12">
              <filter-modal-field-label :label="$t('FILTER.FIELD.SEARCH', 1)">
                <v-text-field
                  v-model.trim="state.filter.keyword"
                  :placeholder="$t('FILTER.FIELD.SEARCH', 0)"
                  clearable
                  hide-details
                  role="button"
                  variant="solo"
                  density="compact"
                  class="tw-mt-2 [&>div>div]:tw-rounded-none app-clearable-icon"
                />
              </filter-modal-field-label>
            </v-col>
            <v-col cols="12" md="4">
              <filter-modal-field-label :label="$t('ORDERS.FILTER.STATUS')">
                <v-select
                  v-model="state.filter.isPaid"
                  :items="paidStatusItems"
                  tile
                  hide-details
                  role="button"
                  density="compact"
                  variant="solo"
                  item-title="text"
                  item-value="value"
                  menu-icon="mdi-chevron-down"
                  class="tw-mt-1"
                />
              </filter-modal-field-label>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="10" lg="6">
              <filter-modal-field-label :label="$t('ORDERS.FILTER.DATE')">
                <v-row class="tw-py-2" align="center">
                  <v-col cols="12" sm="5" class="!tw-py-1">
                    <date-time-modal v-model="state.filter.startDate">
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
                    <date-time-modal v-model="state.filter.endDate">
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
              </filter-modal-field-label>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
    <template #actions>
      <v-row justify="center" class="tw-py-7">
        <v-col cols="12" sm="auto" class="tw-text-center !tw-p-0">
          <v-btn
            :color="color"
            width="150"
            size="large"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="close"
          >
            {{ $t('FILTER.BUTTON.CLOSE') }}
          </v-btn>
        </v-col>
        <v-col cols="12" sm="auto" class="tw-text-center !tw-p-0">
          <v-btn
            :color="color"
            flat
            width="150"
            size="large"
            variant="elevated"
            class="!tw-normal-case !font-normal tw-ml-0 tw-mt-3 sm:tw-mt-0 sm:tw-ml-3
            !tw-text-white !tw-text-lg"
            @click="onSearchHandler"
          >
            {{ $t('FILTER.BUTTON.SEARCH') }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import { useOrdersFilterModalComponent, type IEmits } from './index.script'

const emits = defineEmits<IEmits>()

const {
  isOpen, close, color, state, paidStatusItems, onSearchHandler,
} = useOrdersFilterModalComponent(emits)
</script>
