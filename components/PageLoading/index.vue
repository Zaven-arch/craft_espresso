<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <v-sheet
      :height="height"
      :style="`--scale: ${scale}`"
      class="loading-block"
      color="transparent"
    >
      <div class="scene">
        <div class="plane">
          <div v-for="i in 8" :key="i" class="cube-wrapper">
            <div :class="`cube cube--${i - 1}`" :style="state[i - 1]">
              <div v-for="j in 6" :key="j + i + 7" class="cube__side" />
            </div>
            <div :class="`shadow shadow--${i - 1}`" :style="state[i - 1]" />
          </div>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { usePageLoadingComponent, defaultProps, type IPageLoadingProps } from './index.script'

withDefaults(
  defineProps<Partial<IPageLoadingProps>>(),
  defaultProps,
)

const { state } = usePageLoadingComponent()
</script>

<style scoped lang="scss" src="./index.scss"></style>
