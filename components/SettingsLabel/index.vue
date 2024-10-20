<template>
  <div class="tw-grid sm:tw-grid-cols-[12rem_21rem] tw-text-app-gun-powder">
    <span class="tw-text-[15px] tw-font-normal">
      <span class="tw-relative">
        <slot name="label">
          <span v-html="label" />
        </slot>
        <icon
          v-if="redStar"
          name="mingcute:asterisk-fill"
          class="tw-text-[#FF6565] tw-absolute tw-top-0 -tw-right-3"
          size="10"
        />
      </span>
    </span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defaultProps, type ISettingsLabelProps } from './index.script'

withDefaults(defineProps<ISettingsLabelProps>(), defaultProps)
</script>
