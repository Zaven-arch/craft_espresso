/* eslint-disable no-undef */

import type { Validation } from '@vuelidate/core'

import { Colors } from '~/enums'

import type { IUseLoading, IUseSnackbar, IUseLogin } from '~/interfaces'

import { AuthService } from '~/services'

export const useLogin = (): IUseLogin => {
  const $route = useRoute()
  const $router = useRouter()

  const { goTo } = useAppRouter()

  const { loading, setLoading }: IUseLoading = useLoading(false)

  const { $open }: IUseSnackbar = useSnackbar()

  const { login } = new AuthService()

  const redirectionPath: Ref<string> = ref<string>('')

  watchEffect(() => {
    if ($route.query?.rp) {
      redirectionPath.value = $route.query?.rp as string
    }

    $router.replace($route.path)
  })

  const submitHandler = async (v$: Ref<Validation<any, any>>) => {
    const isValid: boolean = await v$.value.$validate()

    if (!isValid) {
      return false
    }

    try {
      setLoading(true)

      await login({
        email: v$.value.login.$model,
        password: v$.value.password.$model,
      })

      goTo(`/${redirectionPath.value || ''}`)
    } catch (e: any) {
      $open(
        Colors.RED,
        Array.isArray(e?.message) ? e?.message?.join(', ') : e?.message,
      )
    } finally {
      setLoading(false)

      Array.prototype.forEach(
        (key: string) => {
          v$.value[key].$model = ''
        },
        ['login', 'password'],
      )

      v$.value.$reset()
    }
  }

  return {
    loading,
    submitHandler,
  } as any
}
