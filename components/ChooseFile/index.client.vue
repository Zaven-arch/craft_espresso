<template>
  <div>
    <v-file-input
      :key="state.files.length"
      ref="fileUploader"
      :multiple="multiple"
      :accept="accept.join()"
      prepend-icon
      hide-details
      class="!tw-hidden"
      @update:model-value="onChange"
    />
    <v-row>
      <slot
        :files="state.files"
        :on-delete-handler="onWrapDeleteHandler"
        name="uploaded"
      />
      <v-col v-if="isVisible">
        <v-card
          :ripple="clickable"
          :color="backgroundColor"
          :min-height="minHeight"
          :class="{ 'is-dragover': state.dragover }"
          rounded="0"
          variant="flat"
          class="!tw-flex !tw-items-center tw-w-full tw-outline-offset-[-10px] tw-outline-2
          tw-outline-dashed tw-outline-stone-300 tw-transition-[outline-offset] tw-duration-150
          [&.is-dragover]:tw-outline-0"
          @dragenter.prevent="state.dragover = true"
          @dragleave.prevent="state.dragover = false"
          @dragover.prevent="state.dragover = true"
          @drop.prevent="onChange($event, true)"
          v-on="{ click: clickable && onButtonClick }"
        >
          <v-card-text class="tw-flex tw-justify-center tw-items-center">
            <v-slide-y-transition leave-absolute hide-on-leave>
              <v-icon
                v-if="state.dragover"
                :color="color"
                size="90"
                class="tw-opacity-10"
                icon="mdi-file-check-outline"
              />
            </v-slide-y-transition>
            <v-slide-y-reverse-transition leave-absolute hide-on-leave>
              <div
                v-if="!state.dragover"
                class="tw-flex tw-flex-col tw-justify-center tw-items-center"
              >
                <slot name="icon">
                  <v-icon
                    :color="color"
                    size="35"
                    icon="mdi-cloud-upload"
                    class="tw-opacity-10"
                  />
                </slot>
                <slot name="text">
                  <p
                    v-for="(text, i) in $tm('FILE_UPLOAD.TEXT')"
                    :key="i"
                    :class="[{ 'mb-3': i, 'mt-3': !i }, textClass]"
                    class="tw-text-app-gun-powder-light tw-opacity-50 tw-text-base tw-text-center"
                    v-text="$rt(text)"
                  />
                </slot>
                <slot name="button" :on-button-click="onButtonClick">
                  <v-btn
                    :color="buttonColor"
                    flat
                    class="!tw-normal-case !tw-text-white"
                    @click="onButtonClick"
                  >
                    {{ $t('FILE_UPLOAD.BUTTON.CHOOSE') }}
                  </v-btn>
                </slot>
              </div>
            </v-slide-y-reverse-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import {
  useChooseFileComponent,
  type IChooseFileProps,
  type IEmits,
  defaultProps,
} from './index.script'

const props = withDefaults(defineProps<IChooseFileProps>(), defaultProps)

const emits = defineEmits<IEmits>()

const {
  state,
  isVisible,
  fileUploader,
  backgroundColor,
  buttonColor,
  color,
  onChange,
  onWrapDeleteHandler,
  onButtonClick,
} = useChooseFileComponent(props, emits)
</script>
