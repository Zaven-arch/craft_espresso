<template>
  <v-row class="tw-py-4">
    <v-col cols="12">
      <admin-toolbar
        actions
        :action-items="ordersActionConfig.toolbar"
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
              v-model="state.isPaid"
              :items="paidStatusItems"
              :loading="paidStatusLoading"
              :disabled="paidStatusLoading"
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
        <v-sheet min-width="900" color="transparent">
          <page-list-title
            :indeterminate="!state.data?.length"
            :checkbox-state="checkboxRef.checkbox?.state"
            @on-checkbox-change="checkboxRef.checkbox?.setToggle"
          >
            <template #title>
              {{ $t('ORDERS.TITLE') }}
            </template>
            <template #titleItems>
              <div
                class="tw-grid tw-text-center tw-font-bold tw-text-app-grey-font tw-gap-3
                tw-grid-cols-[1fr_100px_150px_repeat(2,_130px)]
                tw-text-xs tw-items-center"
              >
                <div
                  v-for="(title, i) in $tm('ORDERS.GRID_TITLES')"
                  :key="$rt(title)"
                  :class="{ 'tw-text-left tw-pl-5': !i, }"
                  v-text="$rt(title)"
                />
              </div>
            </template>
          </page-list-title>
          <v-scale-transition>
            <page-loading v-if="pending" height="300" />
          </v-scale-transition>
          <div v-if="!pending">
            <v-list bg-color="transparent">
              <v-scroll-y-transition group leave-absolute hide-on-leave>
                <template
                  v-for="item in state.data"
                  :key="`order-${item.id}`"
                >
                  <order-card
                    :id="item.id"
                    :checkbox-state="checkboxRef.checkbox?.state"
                    :order="item.order"
                    :price="item.price"
                    :products="item.products"
                    :is-paid="item.is_paid"
                    :status="item.status"
                    :payment-method="item.payment_method"
                    :memo="item.memo"
                    class="tw-mt-2"
                  >
                    <template #actionButton>
                      <admin-action-button
                        :id="item.id"
                        :items="ordersActionConfig.card"
                        block
                        @on-change="actionHandler"
                      />
                    </template>
                  </order-card>
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
        {{ $t('ORDERS.ACTIONS_MODAL_TITLE.DELETE') }}
      </template>
      <template #body>
        {{ $t('ORDERS.ACTIONS_MODAL_TITLE.DELETE_DETAIL') }}
      </template>
    </admin-delete-modal>
    <admin-changes-modal
      :key="changeToPaidModal.isOpen.value + 'change'"
      :loading="changeToPaidLoading"
      :modal="changeToPaidModal.isOpen.value"
      @close="onCloseModal(changeToPaidModal.close)"
      @on-change="onChangeToPaidHandler"
    >
      <template #title>
        {{ $t('ORDERS.ACTIONS_MODAL_TITLE.CHANGE_TO_PAID') }}
      </template>
      <template #body>
        <div
          class="tw-text-center tw-text-lg tw-text-app-gun-powder-light tw-my-5 sm:tw-my-12"
        >
          {{ $t('ORDERS.ACTIONS_MODAL_TITLE.CHANGE_TO_PAID_DETAIL') }}
        </div>
      </template>
    </admin-changes-modal>
    <admin-changes-modal
      :key="changeStatusModal.isOpen.value + 'change'"
      :loading="changeStatusLoading"
      :modal="changeStatusModal.isOpen.value"
      :items="statusItems"
      @close="onCloseModal(changeStatusModal.close)"
      @on-change="onChangeStatusHandler"
    >
      <template #title>
        {{ $t('ORDERS.ACTIONS_MODAL_TITLE.CHANGE_STATUS') }}
      </template>
    </admin-changes-modal>
  </v-row>
</template>

<script lang="ts" setup>
import { useOrdersPage } from './index.script'

const {
  color,
  page,
  state,
  checkboxRef,
  pending,
  actionHandler,
  onSearchHandler,
  searchLoading,
  paidStatusItems,
  paidStatusLoading,
  deleteModal,
  deleteLoading,
  onCloseModal,
  onDeleteHandler,
  changeToPaidModal,
  changeToPaidLoading,
  onChangeToPaidHandler,
  changeStatusModal,
  changeStatusLoading,
  onChangeStatusHandler,
  statusItems,
  ordersActionConfig,
} = useOrdersPage()
</script>
