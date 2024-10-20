<template>
  <v-sheet
    :min-height="`calc(100vh - ${$vuetify.display.mobile ? 104 : 144}px)`"
    color="white"
    class="tw-p-5 lg:tw-p-7 xl:tw-px-10"
  >
    <h2
      class="tw-mb-5 tw-text-center sm:tw-text-left tw-font-normal tw-text-2xl
      tw-text-app-gun-powder-light"
    >
      <slot name="title" />
    </h2>
    <v-form class="tw-text-left" @submit.prevent="$emit('onSubmit')">
      <div :class="contentClass" class="tw-grid tw-gap-y-4">
        <slot />
      </div>
      <v-sheet
        :class="buttonClass"
        :width="buttonBlockWidth"
        class="tw-mt-10"
        color="transparent"
      >
        <div />
        <v-btn
          :loading="loading"
          :color="buttonColor"
          flat
          block
          size="large"
          type="submit"
          class="!tw-normal-case !tw-text-white"
        >
          <slot name="buttonText" />
        </v-btn>
      </v-sheet>
    </v-form>
  </v-sheet>
</template>

<script lang="ts" setup>
import {
  defaultProps,
  type ISettingsWrapperProps,
  type IEmits,
} from './index.script'

withDefaults(defineProps<ISettingsWrapperProps>(), defaultProps)

defineEmits<IEmits>()
</script>
