<template>
  <settings-wrapper
    :button-color="color"
    button-class="!tw-grid sm:!tw-grid-cols-[12rem_21rem]"
    @on-submit="onSaveHandler"
  >
    <template #title>
      {{ $t('SETTING_GENERAL.TITLE') }}
    </template>
    <template #buttonText>
      <span
        class="tw-font-normal tw-text-lg"
        v-text="$t('SETTING_GENERAL.BUTTON')"
      />
    </template>
    <settings-label
      :label="$t('SETTING_GENERAL.LANGUAGE')"
      class="tw-items-center"
    >
      <v-select
        v-model="form.language"
        :items="languages"
        :color="color"
        role="button"
        hide-details
        density="comfortable"
        variant="outlined"
        item-title="text"
        item-value="value"
        menu-icon="mdi-chevron-down"
      />
    </settings-label>
  </settings-wrapper>
</template>

<script lang="ts" setup>
import { useGeneralSettingsPage } from './index.script'

const {
  color, languages, form, onSaveHandler,
} = await useGeneralSettingsPage()
</script>
