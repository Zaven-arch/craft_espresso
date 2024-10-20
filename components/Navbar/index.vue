<template>
  <v-banner
    sticky
    elevation="4"
    class="!tw-p-0 !tw-border-none !tw-z-[2397] !tw-bg-app-primary-black"
  >
    <v-container :fluid="$vuetify.display.width < 768" class="!tw-py-0">
      <v-list class="!tw-py-0 !tw-bg-app-primary-black">
        <v-list-item
          :class="{ '!tw-px-0': $vuetify.display.width < 768 }"
          class="!tw-py-0"
        >
          <div class="tw-flex tw-items-center tw-gap-1">
            <div
              v-if="$vuetify.display.width <= 1024"
              class="tw-relative tw-top-[13px]"
            >
              <icon
                name="ic:round-menu"
                size="24"
                class="tw-text-white"
                @click.stop="open"
              />
            </div>
            <v-sheet width="100vw">
              <v-tabs
                v-model="$navbar.tab"
                :slider-color="$navbar.color.sliderColor"
                :color="$navbar.color.tabColor"
                class="tw-pt-6 !tw-bg-app-primary-black"
                height="72"
              >
                <v-tab
                  v-for="(tab, i) in tabs"
                  :key="tab.name"
                  :exact="!i"
                  :class="{ 'tw-ml-0': isRight }"
                  :to="localePath($getPath(tab.route))"
                  class="!tw-h-auto"
                  @click="setNavbarTab(i)"
                >
                  <div class="tw-flex tw-items-end">
                    <span
                      class="tw-normal-case tw-text-lg tw-text-white"
                      v-text="$t(tab.name)"
                    />
                  </div>
                </v-tab>
              </v-tabs>
            </v-sheet>
          </div>
        </v-list-item>
      </v-list>
    </v-container>
  </v-banner>
</template>

<script lang="ts" setup>
import { useNavbarComponent } from './index.script'

const {
  open, tabs, isRight, $navbar, setNavbarTab, $getPath,
} = useNavbarComponent()
</script>
