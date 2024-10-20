<template>
  <v-card tile variant="flat">
    <v-card-text class="!tw-px-0 !tw-py-2">
      <v-row class="!tw-my-0 !tw-mr-0" justify="center">
        <v-col cols="6" class="!tw-pr-1 !tw-grow">
          <v-text-field
            v-model="form.name"
            :color="color"
            :readonly="readonly"
            :label="$t('PRODUCT_DETAILS.FIELD.NAME')"
            :class="{ '[&_input]:!tw-cursor-not-allowed': readonly }"
            hide-details
            role="button"
            density="comfortable"
            variant="outlined"
          />
        </v-col>
        <v-col cols="3" class="!tw-px-1">
          <v-text-field
            v-model="form.quantity"
            :color="color"
            :readonly="readonly"
            :label="$t('PRODUCT_DETAILS.FIELD.QUANTITY')"
            :class="{ '[&_input]:!tw-cursor-not-allowed': readonly }"
            hide-details
            role="button"
            density="comfortable"
            variant="outlined"
          />
        </v-col>
        <v-col
          :class="{ 'tw-cursor-not-allowed': readonly }"
          cols="auto"
          class="!tw-px-1"
        >
          <v-btn
            :color="color"
            :readonly="readonly"
            :disabled="readonly"
            :variant="form.is_gram ? 'elevated' : 'tonal'"
            :class="{ '!tw-text-white': form.is_gram }"
            block
            elevation="0"
            min-width="48"
            size="large"
            class="!tw-normal-case !tw-font-normal !tw-text-lg !tw-h-full"
            @click="onGramHandler"
          >
            {{ $t('WEIGHT.GRAM') }}
          </v-btn>
        </v-col>
        <v-col
          :class="{ 'tw-cursor-not-allowed': readonly }"
          cols="auto"
          class="!tw-pl-1 !tw-pr-0"
        >
          <v-btn
            :color="color"
            :readonly="readonly"
            :disabled="readonly"
            block
            variant="outlined"
            elevation="0"
            min-width="48"
            class="!tw-normal-case !tw-font-normal !tw-text-lg !tw-h-full !tw-p-0"
            @click="$emit('onRemove', data?.id)"
          >
            <v-icon size="20" icon="mdi-delete" />
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script  lang="ts" setup>
import {
  useProductDetailItemComponent, type IProductDetailItemProps, type IEmits, defaultProps,
} from './index.script'

const props = withDefaults(
  defineProps<IProductDetailItemProps>(),
  defaultProps,
)

const emits = defineEmits<IEmits>()

const { form, onGramHandler, color } = useProductDetailItemComponent(props, emits)
</script>
