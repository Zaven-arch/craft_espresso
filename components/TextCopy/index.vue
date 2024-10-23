<template>
  <div
    :class="{ 'tw-group/text': !mobile }"
    class="tw-flex tw-gap-2 tw-items-center"
    role="button"
    @click="doCopy(entry || text)"
  >
    <span
      class="tw-truncate group-hover/text:tw-text-app-gun-powder tw-transition-all
      tw-duration-100 tw-text-app-gun-powder-light"
      v-html="text || '&mdash;'"
    />
    <v-icon
      v-if="text"
      :icon="icon"
      :size="mobile ? 15 : 18"
      :class="{ 'tw-text-app-green': isCopied, 'tw-invisible': !mobile }"
      class="group-hover/text:tw-visible tw-transition-all tw-duration-100"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  useTextCopyComponent,
  defaultProps,
  type ITextCopyProps,
} from './index.script'

withDefaults(defineProps<Partial<ITextCopyProps>>(), defaultProps)

const { doCopy, icon, isCopied } = useTextCopyComponent()
</script>
