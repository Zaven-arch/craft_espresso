<template>
  <v-card
    v-if="state"
    :color="state.isSelected ? 'white' : undefined"
    :variant="state.isSelected ? 'tonal' : 'elevated'"
    rounded="lg"
    height="120"
    class="tw-cursor-pointer tw-relative tw-overflow-hidden !tw-select-none"
    @click="onToggleIsSelected"
  >
    <v-card-text
      class="tw-grid tw-place-items-center tw-gap-2 !tw-p-2 tw-h-full"
    >
      <v-img :src="photo" width="36" height="70" />
      <div class="tw-truncate tw-max-w-[100px]">
        <span class="tw-font-semibold tw-text-xs" v-text="text" />
      </div>
    </v-card-text>
    <v-btn
      v-if="state.isSelected"
      width="auto"
      min-width="auto"
      :color="primaryBlack"
      size="x-small"
      class="!tw-absolute !tw-top-1 !tw-right-1 !tw-text-white"
      @click.stop="onToggleIsBig"
    >
      {{ $t(`CASHBOX.${state.isBig ? 'BIG' : 'SMALL'}`) }}
    </v-btn>
    <v-slide-y-reverse-transition>
      <v-sheet
        v-if="state.isSelected"
        :color="color"
        class="tw-absolute tw-bottom-0 tw-inset-x-0 tw-p-1 !tw-flex !tw-items-center
        !tw-justify-between"
      >
        <v-btn
          height="20"
          rounded
          icon="mdi-minus"
          size="x-small"
          class="!tw-p-1 !tw-flex !tw-items-center"
          @click.stop="onRemove"
        />
        <span
          class="tw-font-semibold tw-text-white tw-text-lg"
          v-text="state[countProp]"
        />
        <v-btn
          height="20"
          rounded
          icon="mdi-plus"
          size="x-small"
          class="!tw-p-1 !tw-flex !tw-items-center"
          @click.stop="onAdd"
        />
      </v-sheet>
    </v-slide-y-reverse-transition>
  </v-card>
</template>

<script lang="ts" setup>
import {
  useCashboxProductCardComponent,
  defaultProps,
  type ICashboxProductCardComponentProps,
} from './index.script'

const props = withDefaults(
  defineProps<ICashboxProductCardComponentProps>(),
  defaultProps,
)

const {
  color,
  onToggleIsSelected,
  state,
  photo,
  onAdd,
  countProp,
  onRemove,
  onToggleIsBig,
  primaryBlack,
} = useCashboxProductCardComponent(props)
</script>
