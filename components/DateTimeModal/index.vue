<template>
  <div>
    <slot name="field" :clear="$clear" :open="open" :date="state.fullDate" />
  </div>
  <div v-if="!readonly">
    <modal-window
      :key="isOpen"
      :modal="isOpen"
      persistent
      max-width="328"
      @close="$emit('close')"
    >
      <v-sheet v-if="state.isDate" width="328" rounded="0">
        <v-date-picker
          v-model="state.date"
          v-model:year="state.year"
          :color="color"
          :title="titleAsYear"
          :allowed-dates="allowDates"
          rounded="0"
          class="[&>div:first-child]:tw-text-white"
        />
        <v-row class="!tw-mb-0 !tw-mx-0 !tw-pr-2" justify="end">
          <v-col class="!tw-pl-0 !tw-pr-1" cols="auto">
            <v-btn
              :color="color"
              variant="text"
              class="!tw-font-semibold"
              @click="close"
            >
              {{ $t('DATE_TIME_PICKER.CANCEL') }}
            </v-btn>
          </v-col>
          <v-col v-if="dateOnly" class="!tw-pl-0 !tw-pr-1" cols="auto">
            <v-btn
              :color="color"
              variant="text"
              class="!tw-font-semibold"
              @click="$confirmHandler"
            >
              {{ $t('DATE_TIME_PICKER.OK') }}
            </v-btn>
          </v-col>
          <v-col v-else class="!tw-pl-0 !tw-pr-1" cols="auto">
            <v-btn
              :color="color"
              variant="text"
              class="!tw-font-semibold"
              @click="$toggle"
            >
              {{ $t('DATE_TIME_PICKER.NEXT') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
      <vertical-time-picker
        v-else-if="!state.isDate && !dateOnly"
        v-model="state.time"
      >
        <v-spacer />
        <v-btn
          class="!tw-font-semibold"
          variant="text"
          :color="color"
          @click="close"
        >
          {{ $t('DATE_TIME_PICKER.CANCEL') }}
        </v-btn>
        <v-btn
          class="!tw-font-semibold"
          variant="text"
          :color="color"
          @click="$toggle"
        >
          {{ $t('DATE_TIME_PICKER.PREV') }}
        </v-btn>
        <v-btn
          class="!tw-font-semibold"
          variant="text"
          :color="color"
          @click="$confirmHandler"
        >
          {{ $t('DATE_TIME_PICKER.OK') }}
        </v-btn>
      </vertical-time-picker>
    </modal-window>
  </div>
</template>

<script lang="ts" setup>
import {
  useDateTimeModalComponent,
  defaultProps,
  type IDateTimeModalProps,
  type IEmits,
} from './index.script'

const props = withDefaults(defineProps<IDateTimeModalProps>(), defaultProps)

const emits = defineEmits<IEmits>()

const {
  state,
  isOpen,
  titleAsYear,
  $toggle,
  close,
  $confirmHandler,
  $clear,
  open,
  color,
} = useDateTimeModalComponent(props, emits)
</script>
