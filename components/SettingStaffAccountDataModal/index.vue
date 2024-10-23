<template>
  <modal-window :key="isOpen" :modal="isOpen" @close="close">
    <template #title>
      <span
        class="tw-text-app-gun-powder-light tw-text-2xl"
        v-text="$t('SETTING_STAFF.MODAL_TITLE.DATA', +state.isEditModal)"
      />
    </template>
    <template #body>
      <div class="!tw-text-app-gun-powder">
        <v-row class="!tw-mt-5" align="center">
          <v-col cols="12" md="2" class="!tw-py-0">
            <span v-text="$t('SETTING_STAFF.DATA_MODAL.PERMISSION')" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="v$.permission.$model"
              :error-messages="
                v$.permission.$errors.map(({ $message }) => $message)
              "
              :color="color"
              :items="permissionItems"
              role="button"
              density="compact"
              variant="underlined"
              item-title="text"
              item-value="value"
              menu-icon="mdi-chevron-down"
              @on-blur="v$.permission.$touch"
            />
          </v-col>
        </v-row>
        <v-row class="!tw-mt-5" align="center">
          <v-col cols="12" md="2" class="!tw-py-0">
            <span v-text="$t('SETTING_STAFF.DATA_MODAL.EMAIL')" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.trim="v$.email.$model"
              :error-messages="v$.email.$errors.map(({ $message }) => $message)"
              :color="color"
              role="button"
              persistent-hint
              density="compact"
              variant="underlined"
              @blur="v$.email.$touch"
            />
          </v-col>
        </v-row>
        <v-row class="!tw-mt-5" align="center">
          <v-col cols="12" md="2" class="!tw-py-0">
            <span v-text="$t('SETTING_STAFF.DATA_MODAL.PASSWORD', 1)" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.trim="v$.password.$model"
              :error-messages="
                v$.password.$errors.map(({ $message }) => $message)
              "
              :type="password.type.value || password.type"
              :color="color"
              :append-inner-icon="password.icon.value || password.icon"
              variant="underlined"
              density="compact"
              role="button"
              @click:append-inner="password.toggleShow"
              @blur="v$.password.$touch"
            />
          </v-col>
        </v-row>
        <v-row class="!tw-mt-5" align="center">
          <v-col cols="12" md="2" class="!tw-py-0">
            <span v-text="$t('SETTING_STAFF.DATA_MODAL.PASSWORD', 0)" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.trim="v$.confirmPassword.$model"
              :error-messages="
                v$.confirmPassword.$errors.map(({ $message }) => $message)
              "
              :type="confirmPassword.type.value || confirmPassword.type"
              :color="color"
              :append-inner-icon="
                confirmPassword.icon.value || confirmPassword.icon
              "
              variant="underlined"
              density="compact"
              role="button"
              @click:append-inner="confirmPassword.toggleShow"
              @blur="v$.confirmPassword.$touch"
            />
          </v-col>
        </v-row>
        <v-row class="!tw-mt-5" align="center">
          <v-col cols="12" md="2" class="!tw-py-0">
            <span v-text="$t('SETTING_STAFF.DATA_MODAL.STATUS')" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="v$.status.$model"
              :error-messages="
                v$.status.$errors.map(({ $message }) => $message)
              "
              :color="color"
              :items="statuses"
              role="button"
              density="compact"
              variant="underlined"
              item-title="text"
              item-value="value"
              menu-icon="mdi-chevron-down"
              @on-blur="v$.status.$touch"
            />
          </v-col>
        </v-row>
      </div>
    </template>
    <template #actions>
      <v-row v-if="!activeDataLoading" justify="center" class="tw-py-7">
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :color="color"
            width="150"
            size="large"
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-lg"
            @click="close"
          >
            {{ $t('SETTING_STAFF.BUTTON.CLOSE') }}
          </v-btn>
        </v-col>
        <v-col
          :cols="$vuetify.display.width < 425 ? 12 : 'auto'"
          class="tw-text-center !tw-p-0"
        >
          <v-btn
            :loading="loading"
            :color="color"
            :class="$vuetify.display.width < 425 ? 'tw-mt-3' : 'tw-ml-3'"
            flat
            width="150"
            size="large"
            variant="elevated"
            class="!tw-normal-case !font-normal tw-ml-0 !tw-text-white !tw-text-lg"
            @click="onSaveHandler"
          >
            {{ $t('SETTING_STAFF.BUTTON.SAVE') }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </modal-window>
</template>

<script lang="ts" setup>
import { useSettingStaffAccountDataModal } from './index.script'

const {
  v$,
  state,
  loading,
  color,
  close,
  isOpen,
  password,
  confirmPassword,
  permissionItems,
  statuses,
  onSaveHandler,
} = await useSettingStaffAccountDataModal()
</script>
