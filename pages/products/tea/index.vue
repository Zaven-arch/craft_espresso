<template>
  <v-row class="tw-py-4">
    <v-col cols="12">
      <admin-toolbar
        actions
        :action-items="productsActionConfig.toolbar()"
        @on-action="actionHandler"
      >
        <template #begin>
          <v-col cols="12" sm="auto">
            <v-row>
              <v-col class="!tw-pt-0 sm:!tw-pt-3">
                <v-sheet
                  :min-width="$vuetify.display.smAndUp ? 300 : 'auto'"
                  color="transparent"
                >
                  <v-text-field
                    v-model.trim="state.keyword"
                    :placeholder="$t('FILTER.FIELD.SEARCH', 0)"
                    :color="color"
                    clearable
                    role="button"
                    persistent-hint
                    density="compact"
                    hide-details="auto"
                    variant="outlined"
                    bg-color="white"
                    class="sm:tw-min-h-[48px] [&>div>div>div:last-child_*]:tw-opacity-100
                    [&>div>div>div:last-child_*]:tw-border-app-primary-red xs:tw-min-h-[36px]
                    app-clearable-icon--primary-red"
                    @keypress.enter="onSearchHandler()"
                    @click:clear="onSearchHandler()"
                  />
                </v-sheet>
              </v-col>
              <v-col cols="auto" class="!tw-pt-0 sm:!tw-pt-3 !tw-pl-0">
                <v-btn
                  :loading="searchLoading"
                  :color="color"
                  :size="$vuetify.display.smAndUp ? 'large' : 'default'"
                  flat
                  width="110"
                  class="!tw-normal-case !tw-font-normal !tw-text-white"
                  @click="onSearchHandler()"
                >
                  {{ $t('FILTER.BUTTON.SEARCH') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </template>
        <template #end>
          <v-col cols="12" sm="3">
            <v-autocomplete
              v-model="state.status"
              :items="statusItems"
              :loading="statusLoading"
              :disabled="statusLoading"
              :color="color"
              variant="solo"
              menu-icon="mdi-chevron-down"
              density="compact"
              hide-details
              rounded="0"
              item-title="text"
              item-value="value"
            >
              <template #no-data>
                <empty-data src="/images/empty.png" max-width="100" />
              </template>
            </v-autocomplete>
          </v-col>
        </template>
      </admin-toolbar>
    </v-col>
    <v-col cols="12">
      <div class="tw-overflow-x-auto">
        <v-sheet min-width="900">
          <page-list-title
            :indeterminate="!state.data?.length"
            :checkbox-state="checkboxRef.checkbox?.state"
            @on-checkbox-change="checkboxRef.checkbox?.setToggle"
          >
            <template #title>
              {{ $t('PRODUCTS_TEA.TITLE') }}
            </template>
            <template #titleItems>
              <div
                class="tw-grid tw-text-center tw-font-bold tw-text-app-grey-font tw-gap-3
                tw-grid-cols-[36px_1fr_150px_repeat(3,_130px)]
                tw-text-xs tw-items-center"
              >
                <div
                  v-for="(title, i) in $tm('PRODUCTS.GRID_TITLES')"
                  :key="$rt(title)"
                  :class="{ 'tw-text-left tw-pl-3 tw-col-start-2': !i, }"
                  v-text="$rt(title)"
                />
              </div>
            </template>
          </page-list-title>
          <v-scale-transition>
            <page-loading v-if="pending" height="300" />
          </v-scale-transition>
          <div v-if="!pending">
            <v-list>
              <v-scroll-y-transition group leave-absolute hide-on-leave>
                <template
                  v-for="(item, i) in state.data"
                  :key="`product-tea-${item.id}`"
                >
                  <v-divider v-if="i" class="tw-mx-4" />
                  <product-card
                    :id="item.id"
                    :class="{ '-tw-mt-3': !i }"
                    :checkbox-state="checkboxRef.checkbox?.state"
                    :name="item.name"
                    :image="item.image"
                    :type="item.type"
                    :smallPrice="item.small_price"
                    :bigPrice="item.big_price"
                    :status="item.status"
                  >
                    <template #actionButton>
                      <admin-action-button
                        :id="item.id"
                        :items="productsActionConfig.card"
                        block
                        @on-change="actionHandler"
                      />
                    </template>
                  </product-card>
                </template>
              </v-scroll-y-transition>
            </v-list>
            <v-scale-transition leave-absolute hide-on-leave>
              <empty-data v-if="!state.data?.length" src="/images/empty.png" />
            </v-scale-transition>
          </div>
        </v-sheet>
      </div>
    </v-col>
    <v-slide-y-transition hide-on-leave leave-absolute>
      <v-col v-if="state.data?.length" cols="12">
        <div class="tw-flex">
          <pagination v-model="page" :length="state.length" />
        </div>
      </v-col>
    </v-slide-y-transition>
    <admin-delete-modal
      :key="deleteModal.isOpen.value + 'delete'"
      :modal="deleteModal.isOpen.value"
      :loading="deleteLoading"
      @close="onCloseModal(deleteModal.close)"
      @on-delete="onDeleteHandler"
    >
      <template #title>
        {{ $t('PRODUCTS.ACTIONS_MODAL_TITLE.DELETE') }}
      </template>
      <template #body>
        {{ $t('PRODUCTS.ACTIONS_MODAL_TITLE.DELETE_DETAIL') }}
      </template>
    </admin-delete-modal>
    <product-details-drawer />
    <product-data-modal :loading="submitLoading" @on-submit="onSubmitHandler" />
  </v-row>
</template>

<script lang="ts" setup>
import { useProductsTeaPage } from './index.script'

const {
  color,
  page,
  state,
  checkboxRef,
  pending,
  actionHandler,
  onSearchHandler,
  searchLoading,
  statusItems,
  statusLoading,
  deleteModal,
  deleteLoading,
  onCloseModal,
  onDeleteHandler,
  submitLoading, onSubmitHandler,
  productsActionConfig,
} = useProductsTeaPage()
</script>
