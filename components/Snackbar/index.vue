<template>
  <v-snackbar
    v-model="$snackbar.open"
    :timeout="$snackbar.timeout"
    :color="$snackbar.color"
    :location="'right top'"
    position="fixed"
  >
    <div class="d-flex justify-space-between align-center">
      <span class="tw-text-white" v-text="$snackbar.message" />
      <v-btn
        variant="text"
        class="!tw-normal-case !tw-text-white"
        @click="$close"
      >
        {{ $t($snackbar.closeText) }}
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { useSnackbarComponent } from './index.script'

const { $snackbar, $close } = useSnackbarComponent()
</script>
