import type { IUseLogout } from '~/interfaces'

export function useLogout(): IUseLogout {
  const loading: Ref<boolean> = ref(false)

  const setLoading = (value: boolean): boolean => (loading.value = value)

  const logout = async (fn: Function): Promise<void> => {
    setLoading(true)

    await fn()

    setLoading(false)
  }

  return {
    loading,
    setLoading,
    logout,
  }
}
