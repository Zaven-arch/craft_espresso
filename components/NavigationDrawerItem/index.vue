<template>
  <v-tab
    v-if="!hasLimitation"
    :disabled="loading"
    :to="localePath($getPath(route))"
    :value="localePath($getPath(route))"
    selected-class="v-tab--selected !tw-bg-app-black-opacity
    [&_svg>path]:!tw-fill-[var(--active-icon-color)]"
    exact
    class="!tw-flex [&>:nth-child(3)]:tw-grow"
    @click="setTab(localePath($getPath(route)))"
  >
    <v-sheet
      class="!tw-flex tw-justify-between tw-items-center"
      color="transparent"
      min-width="100%"
    >
      <div class="tw-flex">
        <v-sheet
          v-if="icon"
          color="transparent"
          width="17"
          height="17"
          class="tw-mr-2 tw-mt-px"
          v-html="icon"
        />
        <span
          class="tw-text-white tw-normal-case tw-font-normal tw-text-[15px]"
          v-text="name"
        />
      </div>
      <v-progress-circular
        v-if="!loading && current"
        width="1"
        size="20"
        color="white"
        indeterminate
      />
      <badge
        v-if="$drawer.badges.get(route).state.content"
        :content="$drawer.badges.get(route).state.content"
        :color="$drawer.color.sliderColor"
        position-none
      />
    </v-sheet>
  </v-tab>
</template>

<script lang="ts" setup>
import {
  useNavigationDrawerItemComponent,
  defaultProps,
  type INavigationDrawerItemProps,
} from './index.script'

withDefaults(defineProps<Partial<INavigationDrawerItemProps>>(), defaultProps)

const { $drawer, setTab, $getPath } = useNavigationDrawerItemComponent()
</script>
