<template>
  <div>
    <v-form @submit.prevent="state.submitHandler(state.v$)">
      <v-row justify="center">
        <v-col cols="12" class="tw-text-center sm:tw-pb-12">
          <h4
            class="tw-font-normal tw-text-app-gun-powder-light tw-opacity-50 tw-text-lg"
            v-text="$t('LOGIN.SUBTITLE')"
          />
        </v-col>
        <v-col cols="11" sm="7">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model.trim="state.v$.value.login.$model"
                :error-messages="
                  state.v$.value.login.$errors.map(({ $message }) => $message)
                "
                :color="state.color"
                :label="$t('LOGIN.EMAIL')"
                role="button"
                density="compact"
                variant="underlined"
                class="[&_label]:!tw-opacity-100 tw-text-app-gun-powder"
                @blur="state.v$.value.login.$touch"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model.trim="state.v$.value.password.$model"
                :error-messages="
                  state.v$.value.password.$errors.map(
                    ({ $message }) => $message,
                  )
                "
                :color="state.color"
                :label="$t('LOGIN.PASSWORD')"
                :type="state.type.value || state.type"
                :append-inner-icon="state.icon.value || state.icon"
                role="button"
                density="compact"
                variant="underlined"
                class="[&_label]:!tw-opacity-100 tw-text-app-gun-powder [&_i]:!tw-opacity-100"
                @click:append-inner="state.toggleShow"
                @blur="state.v$.value.password.$touch"
              />
            </v-col>
            <v-col cols="12" class="tw-py-7 lg:tw-py-14">
              <v-row justify="space-between">
                <v-col>
                  <v-btn
                    :loading="state.loading.value"
                    :color="state.color"
                    :size="$vuetify.display.smAndUp ? 'large' : 'default'"
                    flat
                    block
                    type="submit"
                    class="!tw-normal-case !tw-text-white"
                  >
                    {{ $t('LOGIN.BUTTON') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useLoginPage } from './index.script'

definePageMeta({
  layout: 'auth',
  middleware: ['only-unauthorized-middleware'],
})

const state = await useLoginPage()
</script>
