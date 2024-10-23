<template>
  <v-row class="tw-py-4">
    <v-col cols="12">
      <admin-toolbar>
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
                    @keypress.enter="onSearchHandler"
                    @click:clear="onSearchHandler"
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
                  @click="onSearchHandler"
                >
                  {{ $t('FILTER.BUTTON.SEARCH') }}
                </v-btn>
              </v-col>
            </v-row>
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
              {{ $t('MANAGEMENT_INPUT.TITLE') }}
            </template>
            <template #titleItems>
              <div
                class="tw-grid tw-text-center tw-font-bold tw-text-app-grey-font tw-gap-3
                tw-grid-cols-[1fr_repeat(3,_150px)_50px_130px]
                tw-text-xs tw-items-center"
              >
                <div
                  v-for="(title, i) in $tm('MANAGEMENT.GRID_TITLES')"
                  :key="$rt(title)"
                  :class="{ 'tw-text-left tw-pl-3': !i }"
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
                  :key="`management-input-${item.id}`"
                >
                  <v-divider v-if="i" class="tw-mx-4" />
                  <management-card
                    :id="item.id"
                    :class="{ '-tw-mt-3': !i }"
                    :checkbox-state="checkboxRef.checkbox?.state"
                    :name="item.name"
                    :type="item.type"
                    :price="item.price"
                    :quantity="item.quantity"
                    :date="item.date"
                    :is-gram="item.is_gram"
                    :is-kilogram="item.is_kilogram"
                  >
                    <template #actionButton>
                      <admin-action-button
                        :id="item.id"
                        :items="managementActionConfig.card"
                        block
                        @on-change="actionHandler"
                      />
                    </template>
                  </management-card>
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
    <management-data-modal
      :loading="submitLoading"
      @on-submit="onSubmitHandler"
    />
  </v-row>
</template>

<script lang="ts" setup>
import { useManagementInputPage } from './index.script'

definePageMeta({
  middleware: ['only-authorized-middleware'],
})

const {
  color,
  page,
  state,
  checkboxRef,
  pending,
  actionHandler,
  onSearchHandler,
  searchLoading,
  submitLoading,
  onSubmitHandler,
  managementActionConfig,
} = useManagementInputPage()
</script>
