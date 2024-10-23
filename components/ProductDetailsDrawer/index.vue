<template>
  <v-navigation-drawer
    v-model="isOpen"
    width="550"
    elevation="5"
    location="right"
    temporary
    border="0"
  >
    <v-sheet height="72" />
    <v-card tile variant="flat" class="!tw-p-0" height="calc(100% - 72px)">
      <v-card-title
        class="!tw-text-3xl !tw-flex tw-justify-between tw-items-center
        !tw-px-5 !tw-py-5 tw-bg-app-primary-red"
      >
        <div class="tw-flex tw-text-white">
          <span class="tw-max-w-[370px] tw-flex tw-gap-1.5">
            <span v-text="$t('PRODUCT_DETAILS.TITLE')" />
            <span
              class="tw-text-white/80 tw-truncate"
              v-text="state.active?.name"
            />
          </span>
          <v-img :src="photo" contain width="36" height="36" />
        </div>
        <div>
          <v-chip
            v-if="cardType"
            :color="cardType?.textColor"
            :class="cardType?.color"
            class="app-status-chip tw-w-24"
          >
            <span v-text="$t(cardType?.text)" />
          </v-chip>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="!tw-p-0 tw-h-[calc(100%_-_140px)] tw-overflow-y-auto">
        <div>
          <v-slide-y-transition group leave-absolute hide-on-leave>
            <template v-for="(detail, index) in details" :key="detail.id">
              <product-detail-item
                v-model="details[index]"
                :readonly="isReadOnly"
                @on-remove="onRemoveHandler"
              />
              <v-divider />
            </template>
          </v-slide-y-transition>
        </div>
        <v-row class="!tw-m-0" justify="end">
          <v-col cols="auto">
            <v-btn
              :color="color"
              :disabled="isReadOnly"
              variant="elevated"
              block
              elevation="0"
              min-width="48"
              size="small"
              class="!tw-normal-case !tw-font-normal !tw-text-white"
              @click="onAddItemHandler"
            >
              {{ $t('PRODUCT_DETAILS.BUTTON.ADD') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="!tw-sticky !-tw-bottom-px !tw-p-0">
        <v-row justify="center">
          <v-col
            :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
            class="tw-text-center !tw-p-0"
          >
            <v-btn
              :color="color"
              :variant="isBig ? 'elevated' : 'tonal'"
              :class="{ '!tw-text-white': isBig }"
              min-width="120"
              elevation="0"
              append-icon="mdi-cached"
              class="!tw-normal-case !tw-font-normal"
              @click="onToggleSize"
            >
              {{ $t(`PRODUCT_DETAILS.BUTTON.${isBig ? 'BIG' : 'SMALL'}`) }}
            </v-btn>
          </v-col>
          <v-col
            :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
            class="tw-text-center !tw-p-0"
          >
            <v-btn
              :color="color"
              min-width="120"
              variant="outlined"
              class="!tw-normal-case !tw-font-normal tw-ml-3"
              @click="onCloseModal(close)"
            >
              {{ $t('ACTIONS_MODAL.DATA.BUTTON', 1) }}
            </v-btn>
          </v-col>
          <v-col
            :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
            class="tw-text-center !tw-p-0"
          >
            <v-btn
              :color="color"
              :loading="loading"
              :class="[
                $vuetify.display.width < 425 ? 'tw-mt-3' : 'tw-ml-3',
                { '!tw-text-white': !isReadOnly },
              ]"
              :variant="isReadOnly ? 'tonal' : 'elevated'"
              flat
              min-width="120"
              class="!tw-normal-case !font-normal"
              @click="onEditHandler"
            >
              {{
                isReadOnly
                  ? $t('PRODUCT_DETAILS.BUTTON.EDIT')
                  : $t('ACTIONS_MODAL.DATA.BUTTON', 0)
              }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useProductDetailsDrawerComponent } from './index.script'

const {
  isOpen,
  state,
  details,
  cardType,
  photo,
  loading,
  isBig,
  onToggleSize,
  color,
  close,
  onAddItemHandler,
  onRemoveHandler,
  isReadOnly,
  onEditHandler,
  onCloseModal,
} = useProductDetailsDrawerComponent()
</script>
