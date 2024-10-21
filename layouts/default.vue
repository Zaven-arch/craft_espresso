<template>
  <v-app>
    <navigation-drawer
      :permanent="$vuetify.display.width > 1024"
      :logout-loading="logoutLoading"
      logo-src="/images/logo.png"
      @on-logout="onLogoutHandler"
    />
    <v-sheet :color="color" width="100%" height="100%">
      <v-main class="tw-min-h-full">
        <navbar />
        <v-container class="tw-mx-auto tw-min-h-full !tw-max-w-[1200px]">
          <slot />
        </v-container>
      </v-main>
    </v-sheet>
    <snackbar />
  </v-app>
</template>

<script lang="ts" setup>
const {
  color,
  logoutLoading,
  onLogoutHandler,
} = await useDefaultLayout()
</script>
