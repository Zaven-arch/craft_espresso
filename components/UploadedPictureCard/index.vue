<template>
  <v-sheet
    :min-height="minHeight"
    class="!tw-flex !tw-flex-col !tw-justify-between"
  >
    <v-img
      :src="file.src"
      :alt="filename"
      :aspect-ratio="aspectRatio"
      :width="width"
      :height="height"
      :cover="cover"
    />
    <v-btn
      v-if="deleteButton"
      :color="buttonColor"
      flat
      class="!tw-normal-case !tw-text-white tw-mt-3"
      @click="$emit('onDelete', file)"
    >
      {{ $t('FILE_UPLOAD.BUTTON.DELETE') }}
    </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
import {
  useUploadedPictureCardComponent,
  type IUploadedPictureCardProps,
  type IEmits,
  defaultProps,
} from './index.script'

const props = withDefaults(
  defineProps<Partial<IUploadedPictureCardProps>>(),
  defaultProps,
)
defineEmits<IEmits>()

const { filename } = useUploadedPictureCardComponent(
  props,
)
</script>
