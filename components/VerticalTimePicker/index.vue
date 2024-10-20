<template>
  <v-card :width="width" variant="flat" rounded="0">
    <v-card-title class="tw-p-4 tw-bg-app-primary-red">
      <v-row align="center" justify="end" class="tw-text-6xl tw-text-white">
        <v-col cols="auto" class="tw-flex tw-font-normal">
          <span v-text="hour" />
          <span>:</span>
          <span v-text="minute" />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-2">
      <v-sheet class="tw-overflow-hidden" height="290">
        <v-row class="tw-mx-0">
          <v-col
            class="!tw-pr-0"
            @mousewheel="onWheelHandler($event, 'hours')"
            @touchmove="onTouchMoveHandler($event, 'hours')"
          >
            <v-row
              class="!tw-m-0 hours"
              :style="`--hourY: ${state.hours.position};`"
            >
              <v-col
                v-for="item in state.hours.items"
                :key="item[0]"
                :data-index="item[0]"
                cols="12"
                class="!tw-py-1"
              >
                <v-btn
                  :color="color"
                  :variant="
                    item[0] !== state.hours.position ? 'text' : 'elevated'
                  "
                  :class="{
                    '!tw-text-white': item[0] === state.hours.position,
                  }"
                  flat
                  block
                  class="!tw-text-lg"
                  @click="onClickHandler(item[0], 'hours')"
                >
                  {{ item[1] }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="!tw-pl-0"
            @mousewheel="onWheelHandler($event, 'minutes')"
            @touchmove="onTouchMoveHandler($event, 'minutes')"
          >
            <v-row
              class="!tw-m-0 minutes"
              :style="`--minuteY: ${state.minutes.position};`"
            >
              <v-col
                v-for="item in state.minutes.items"
                :key="item[0]"
                :data-index="item[0]"
                cols="12"
                class="!tw-py-1"
              >
                <v-btn
                  :color="color"
                  :variant="
                    item[0] !== state.minutes.position ? 'text' : 'elevated'
                  "
                  :class="{
                    '!tw-text-white': item[0] === state.minutes.position,
                  }"
                  flat
                  block
                  class="!tw-text-lg"
                  @click="onClickHandler(item[0], 'minutes')"
                >
                  {{ item[1] }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card-text>
    <v-card-actions class="tw-py-2 tw-px-4">
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import {
  useVerticalTimePickerComponent,
  defaultProps,
  type IVerticalTimePickerProps,
  type IEmits,
} from './index.script'

const props = withDefaults(
  defineProps<IVerticalTimePickerProps>(),
  defaultProps,
)

const emits = defineEmits<IEmits>()

const {
  color,
  state,
  hour,
  minute,
  onClickHandler,
  onWheelHandler,
  onTouchMoveHandler,
} = useVerticalTimePickerComponent(props, emits)
</script>

<style lang="scss" scoped src="./index.scss"></style>
