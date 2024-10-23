<template>
  <v-row class="tw-py-4">
    <v-col cols="12">
      <admin-toolbar
        :action-items="ordersActionConfig.toolbar"
        filter
        actions
        @on-action="actionHandler"
        @on-filter="filterModal.open"
      />
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
                tw-grid-cols-[1fr_100px_repeat(2,_150px)_repeat(2,_130px)]
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
    <orders-filter-modal @on-submit="onSearchHandler" />
    <admin-excel-export-modal
      :key="exportModal.isOpen.value + 'export'"
      :loading="downloadLoading"
      :modal="exportModal.isOpen.value"
      @close="exportModal.close"
      @on-download="onDownloadHandler"
    />
  </v-row>
</template>

<script lang="ts" setup>
import { useOrdersWaitPage } from './index.script'

definePageMeta({
  middleware: ['only-authorized-middleware'],
})

const {
  page,
  state,
  checkboxRef,
  pending,
  actionHandler,
  onSearchHandler,
  deleteModal,
  filterModal,
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
  exportModal,
  downloadLoading,
  onDownloadHandler,
  ordersActionConfig,
} = useOrdersWaitPage()
</script>
