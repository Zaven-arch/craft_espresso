<template>
  <v-card flat rounded="0">
    <v-card-text>
      <v-sheet
        class="tw-px-3 !tw-grid !tw-gap-5 tw-items-center !tw-text-app-gun-powder-light
        !tw-grid-cols-[2fr_130px_1.5fr_repeat(3,_140px)] tw-text-base"
      >
        <div>
          <text-copy class="tw-max-w-[264px] tw-font-semibold" :text="email" />
          <span
            v-long-date-with-slash="lastLogin"
            class="tw-text-app-gun-powder-light"
          />
        </div>
        <div
          class="tw-text-center"
          v-text="$t(`SETTING_STAFF.PERMISSION.${permission}`)"
        />
        <div>
          <v-sheet v-if="cardStatus" width="130" class="tw-mx-auto">
            <v-chip
              v-if="cardStatus"
              :color="cardStatus?.textColor"
              :class="cardStatus?.color"
              class="app-status-chip"
            >
              <span v-text="$t(cardStatus?.text, 1)" />
            </v-chip>
          </v-sheet>
        </div>
        <div>
          <v-btn
            v-if="!isOwner"
            :color="color"
            block
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-base"
            @click="onOpenModal(true)"
          >
            {{ $t('SETTING_STAFF.BUTTON.CHANGE_STATUS') }}
          </v-btn>
        </div>
        <div>
          <v-btn
            v-if="!isOwner"
            :color="color"
            block
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-base"
            @click="openEditModal"
          >
            {{ $t('SETTING_STAFF.BUTTON.EDIT') }}
          </v-btn>
        </div>
        <div>
          <v-btn
            v-if="!isOwner"
            :color="color"
            block
            variant="outlined"
            class="!tw-normal-case !tw-font-normal !tw-text-base"
            @click="onOpenModal(false)"
          >
            {{ $t('SETTING_STAFF.BUTTON.DELETE') }}
          </v-btn>
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import {
  useSettingStaffAccountCardComponent,
  defaultProps,
  type ISettingStaffAccountCardProps,
} from './index.script'

const props = withDefaults(
  defineProps<ISettingStaffAccountCardProps>(),
  defaultProps,
)

const {
  cardStatus, isOwner, openEditModal, color, onOpenModal,
} = useSettingStaffAccountCardComponent(props)
</script>
