<template>
  <v-app>
    <v-main class="tw-min-h-full tw-flex tw-items-center">
      <v-container fluid class="lg:!tw-p-0 tw-min-h-full">
        <v-row class="lg:!tw-mr-0 lg:!-tw-mt-1">
          <v-col v-if="$vuetify.display.lgAndUp" lg="6" class="!tw-p-0">
            <v-img
              src="/images/registration-cover-image.png"
              min-height="100%"
              height="100vh"
              cover
            />
          </v-col>
          <v-col lg="6">
            <v-sheet
              min-height="calc(100vh - 85px)"
              class="!tw-grid tw-place-items-center tw-place-content-center tw-auto-rows-max"
            >
              <div
                class="tw-w-full tw-flex tw-items-center tw-justify-center
                tw-gap-1.5 tw-select-none tw-mb-2"
              >
                <img
                  src="/images/logo.png"
                  alt="app logo"
                  eager
                  class="!tw-w-7"
                >
                <span
                  class="tw-text-grey-font tw-text-2xl tw-pt-1.5"
                  v-text="$t('META.NAME')"
                />
              </div>
              <slot />
            </v-sheet>
            <v-footer color="transparent" class="tw-justify-between">
              <v-row align="center">
                <v-col
                  cols="12"
                  sm="6"
                  class="tw-text-center sm:tw-text-left tw-text-[15px]"
                >
                  <p
                    class="tw-mb-1 tw-flex tw-flex-wrap tw-justify-center sm:tw-justify-start"
                  >
                    <span v-text="$t('PRIVACY_POLICY')" />
                    <span class="tw-ml-3" v-text="$t('TERMS_CONDITION')" />
                  </p>
                  <span class="tw-text-gray-500" v-text="$t('COPY_RIGHT')" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-row>
                    <v-col
                      :class="{ '!tw-pr-1': $vuetify.display.width >= 375 }"
                      :cols="$vuetify.display.width < 375 ? 12 : 6"
                      class="!tw-pt-0 sm:!tw-pt-3 sm:!tw-pr-2"
                    >
                      <v-select
                        :color="color"
                        tile
                        hide-details
                        role="button"
                        density="compact"
                        variant="outlined"
                        item-title="text"
                        item-value="value"
                        menu-icon="mdi-chevron-down"
                      />
                    </v-col>
                    <v-col
                      :class="{ '!tw-pl-1': $vuetify.display.width >= 375 }"
                      :cols="$vuetify.display.width < 375 ? 12 : 6"
                      class="!tw-pt-0 sm:!tw-pt-3 sm:!tw-pl-2"
                    >
                      <v-select
                        :color="color"
                        tile
                        hide-details
                        role="button"
                        density="compact"
                        variant="outlined"
                        item-title="text"
                        item-value="value"
                        menu-icon="mdi-chevron-down"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-footer>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <snackbar />
  </v-app>
</template>

<script lang="ts" setup>
const { color } = useAuthLayout()
</script>
