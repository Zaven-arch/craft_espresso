<template>
  <v-badge
    :class="{ '[&_span]:!tw-static [&>div]:!tw-static': positionNone }"
    :model-value="content"
    :color="color"
    :offset-y="offsetY"
    overlap
  >
    <template #badge>
      <component :is="`v-${contentTransition}-transition`" leave-absolute>
        <span :key="`content-${content}`" v-text="content" />
      </component>
    </template>
    <slot />
  </v-badge>
</template>

<script lang="ts" setup>
import { defaultProps, type IBadgeProps } from './index.script'

withDefaults(defineProps<Partial<IBadgeProps>>(), defaultProps)
</script>
