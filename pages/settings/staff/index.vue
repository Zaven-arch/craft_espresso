<template>
  <v-row class="tw-my-1">
    <v-col cols="12">
      <admin-toolbar>
        <template #begin>
          <v-col cols="auto">
            <v-sheet rounded="lg">
              <v-btn
                :color="color"
                :size="$vuetify.display.smAndUp ? 'large' : 'default'"
                block
                variant="outlined"
                class="!tw-normal-case !tw-font-normal"
                @click="dataModal.open"
              >
                {{ $t('SETTING_STAFF.BUTTON.CREATE') }}
              </v-btn>
            </v-sheet>
          </v-col>
        </template>
      </admin-toolbar>
    </v-col>
    <v-col cols="12">
      <div class="tw-overflow-x-auto">
        <v-sheet min-width="1100">
          <page-list-title>
            <template #title>
              {{ $t('SETTING_STAFF.TITLE') }}
            </template>
            <template #checkbox>
              <span />
            </template>
            <template #titleItems>
              <div
                class="tw-grid tw-gap-5 tw-text-center tw-font-bold tw-text-app-grey-font
                tw-grid-cols-[2fr_130px_1.5fr_repeat(3,_140px)] tw-text-xs tw-items-center"
              >
                <div
                  v-for="(title, i) in $tm('SETTING_STAFF.GRID_TITLES')"
                  :key="$rt(title)"
                  :class="{ 'tw-col-start-5': i === 3 }"
                  v-html="$rt(title).replace('\n', '<br>')"
                />
              </div>
            </template>
          </page-list-title>
          <v-scale-transition>
            <page-loading v-if="pending" height="300" />
          </v-scale-transition>
          <div v-if="!pending">
            <v-scroll-y-transition group leave-absolute hide-on-leave>
              <template v-for="(item, i) in state.data" :key="`account-${i}`">
                <v-divider v-if="i" class="tw-mx-4" />
                <setting-staff-account-card
                  :id="item.id"
                  :email="item.email"
                  :status="item.status"
                  :permission="item.permission"
                  :last-login="item.lastLogin"
                  :class="{ '-tw-mt-3': !i }"
                />
              </template>
            </v-scroll-y-transition>
            <v-scale-transition leave-absolute hide-on-leave>
              <empty-data
                v-if="!state.data?.length"
                src="/images/empty.png"
              />
            </v-scale-transition>
          </div>
        </v-sheet>
      </div>
    </v-col>
    <v-slide-y-transition hide-on-leave leave-absolute>
      <v-col v-if="state.length > 1" cols="12">
        <div class="tw-flex">
          <pagination v-model="page" :length="state.length" />
        </div>
      </v-col>
    </v-slide-y-transition>
    <setting-staff-account-data-modal />
    <admin-changes-modal
      :key="changeModal.isOpen.value"
      :modal="changeModal.isOpen.value"
      :items="statuses"
      :loading="changeLoading"
      @close="onCloseModal(true)"
      @on-change="onChangeHandler"
    >
      <template #title>
        {{ $t('SETTING_STAFF.MODAL_TITLE.CHANGE_STATUS') }}
      </template>
      <template #button>
        {{ $t('SETTING_STAFF.BUTTON.CHANGE_STATUS') }}
      </template>
    </admin-changes-modal>
    <admin-delete-modal
      :key="deleteModal.isOpen.value + 'delete'"
      :modal="deleteModal.isOpen.value"
      :loading="deleteLoading"
      @close="onCloseModal"
      @on-delete="onDeleteHandler"
    >
      <template #title>
        {{ $t('SETTING_STAFF.MODAL_TITLE.DELETE') }}
      </template>
      <template #body>
        {{ $t('SETTING_STAFF.MODAL_TITLE.DETAIL') }}
      </template>
    </admin-delete-modal>
  </v-row>
</template>

<script lang="ts" setup>
import { useSettingsStaffPage } from './index.script'

definePageMeta({
  middleware: ['only-authorized-middleware'],
})

const {
  pending,
  state,
  page,
  color,
  dataModal,
  changeModal,
  deleteModal,
  statuses,
  deleteLoading,
  changeLoading,
  onCloseModal,
  onDeleteHandler,
  onChangeHandler,
} = await useSettingsStaffPage()
</script>
