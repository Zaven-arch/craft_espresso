<template>
  <v-app>
    <v-main class="tw-flex tw-items-center tw-min-h-full">
      <v-container fluid class="lg:!tw-p-0 tw-min-h-full">
        <slot />
      </v-container>
    </v-main>
    <snackbar />
  </v-app>
</template>
