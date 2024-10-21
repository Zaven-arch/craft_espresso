<template>
  <v-navigation-drawer
    v-model="$drawer.isOpen"
    :permanent="permanent"
    :color="$drawer.color.drawerColor"
    :class="{ '[&+div]:!tw-z-[23998]': !permanent && $drawer.isOpen }"
    class="!tw-z-[2399]"
    elevation="5"
  >
    <v-sheet
      :color="$drawer.color.titleBackgroundColor"
      height="72"
      class="tw-px-4 !tw-flex !tw-items-center"
    >
      <div class="tw-w-full tw-flex tw-items-center tw-gap-1.5 tw-select-none">
        <img :src="logoSrc" alt="app logo" eager class="!tw-w-[15%]">
        <span
          class="tw-text-app-grey-font tw-text-2xl tw-pt-1.5"
          v-text="$t('META.NAME')"
        />
      </div>
    </v-sheet>
    <div
      class="tw-h-[calc(100%_-_72px)] tw-flex"
      :style="{ '--active-icon-color': $drawer.color.sliderColor }"
    >
      <v-tabs
        v-model="$drawer.tab"
        :bg-color="$drawer.color.tabBackgroundColor"
        :color="$drawer.color.tabColor"
        :slider-color="$drawer.color.sliderColor"
        direction="vertical"
        grow
        class="!tw-grow"
      >
        <div v-if="$drawer.top.length">
          <div v-for="item in $drawer.top" :key="item.name" class="tw-flex">
            <navigation-drawer-item
              :name="$t(item.name)"
              :icon="item.icon"
              :rotate="item.rotate"
              :current="item.current"
              :loading="item.loading"
              :route="item.route"
              :has-limitation="item.hasLimitation"
            />
          </div>
        </div>
        <v-spacer />
        <div v-if="$drawer.bottom.length">
          <div v-for="item in $drawer.bottom" :key="item.name" class="tw-flex">
            <navigation-drawer-item
              :name="$t(item.name)"
              :icon="item.icon"
              :rotate="item.rotate"
              :current="item.current"
              :loading="item.loading"
              :route="item.route"
              :has-limitation="item.hasLimitation"
            />
          </div>
        </div>        <v-container>
          <v-btn
            :loading="logoutLoading"
            variant="outlined"
            color="white"
            block
            class="!tw-capitalize !tw-font-normal"
            @click="$emit('onLogout')"
          >
            {{ $t('SIDEBAR.LOGOUT') }}
          </v-btn>
        </v-container>
      </v-tabs>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {
  useNavigationDrawerComponent, defaultProps, type IEmits, type INavigationDrawerProps,
} from './index.script'

withDefaults(
  defineProps<Partial<INavigationDrawerProps>>(),
  defaultProps,
)

defineEmits<IEmits>()

const { $drawer } = useNavigationDrawerComponent()
</script>
