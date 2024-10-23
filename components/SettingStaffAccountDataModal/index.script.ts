/* eslint-disable no-undef */

import { $getColor } from '~/utils'

import { UserRole, Colors, Status } from '~/enums'

import type { IUseLoading, IUseSnackbar, IStaffPayload } from '~/interfaces'

import { StaffSettingsService } from '~/services'

import { useAccountForm } from '~/validation'

export const useSettingStaffAccountDataModal = async () => {
  const { t } = useI18n()

  const { v$ } = await useAccountForm({ t })

  const keys = {
    permission: 'permission',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    status: 'status',
  }

  const {
    dataModal,
    state,
    statuses,
    setIsEditModal,
    setActiveData,
    setIsNeedToRefresh,
  } = useStaffAccountsSetting({ t })

  const permissionItems: any[] = [UserRole.STAFF].map((value: UserRole) => ({
    text: t(`SETTING_STAFF.PERMISSION.${value}`),
    value,
  }))

  watchEffect(() => !dataModal.isOpen.value && setActiveData())

  const { create, update } = new StaffSettingsService()

  const { $open }: IUseSnackbar = useSnackbar()

  const { loading, setLoading }: IUseLoading = useLoading()

  watch(dataModal.isOpen, (value: boolean) => {
    if (value) {
      return false
    }

    Object.keys(keys).forEach((key: string) => {
      v$.value[key].$model = ''
    })

    v$.value.$reset()
  })

  watch(
    () => state.value.active,
    async () => {
      if (!state.value.active || !dataModal.isOpen.value) {
        return false
      }

      Object.entries(keys).forEach(([key, value]: string[]) => {
        v$.value[key].$model = state.value.active[value] ?? ''
      })

      v$.value.$reset()
    },
  )

  const close = () => {
    setIsEditModal(false)

    dataModal.close()
  }

  const onSaveHandler = async () => {
    const isValid: boolean = await v$.value.$validate()

    if (!isValid) {
      return false
    }

    try {
      setLoading(true)

      const payload: IStaffPayload = {
        email: v$.value.email.$model,
        password: v$.value.password.$model,
        email_confirm: v$.value.status.$model === Status.ENABLE,
        user_metadata: {
          role: v$.value.permission.$model,
          status: v$.value.status.$model,
        },
      }

      if (state.value.isEditModal) {
        await update(state.value.active?.id, payload)
      } else {
        await create(payload)
      }

      $open(
        Colors.GREEN,
        t(
          `SNACKBAR.${
            state.value.isEditModal ? 'EDIT_STAFF_ADMIN' : 'CREATE_STAFF_ADMIN'
          }`,
        ),
      )

      setIsNeedToRefresh(true)

      dataModal.close()
    } catch (e: any) {
      $open(
        Colors.RED,
        Array.isArray(e?.data?.message)
          ? e?.data?.message?.join(', ')
          : e?.data?.message,
      )
    } finally {
      setLoading(false)

      close()
    }
  }

  return {
    v$,
    state,
    loading,
    permissionItems,
    statuses,
    password: usePasswordField(),
    confirmPassword: usePasswordField(),
    isOpen: dataModal.isOpen,
    close,
    onSaveHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
