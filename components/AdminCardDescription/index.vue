<template>
  <div>
    <span v-if="label" :class="[textColor, 'tw-text-base']" v-text="label" />
    <v-card
      :rounded="rounded"
      :class="{ 'tw-mt-0.5': label }"
      :color="outlined ? outlinedColor : color"
      :variant="outlined ? 'outlined' : 'elevated'"
      flat
      max-height="180"
      class="!tw-overflow-y-auto scrollbar !tw-border !tw-border-app-primary-red"
    >
      <v-card-title
        :class="textColor"
        class="!tw-text-base !tw-p-3 !tw-text-app-gun-powder-light !tw-text-justify !tw-font-normal"
        v-html="description"
      />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { Colors } from '~/enums'

import { $getColor } from '~/utils'

import { defaultProps, type IAdminCardDescriptionProps } from './index.script'

withDefaults(defineProps<IAdminCardDescriptionProps>(), defaultProps)

const outlinedColor = $getColor(Colors.LIGHT_GREY)
</script>

<style lang="scss" scoped src="./index.scss"></style>
