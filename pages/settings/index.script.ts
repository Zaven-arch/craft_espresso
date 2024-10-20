import { $getColor } from '~/utils'

import { Colors, Language } from '~/enums'

export const useGeneralSettingsPage = async () => {
  const { t, setLocale, locale } = useI18n()

  const form: Ref<any> = ref({
    language: locale.value,
  })

  const languages: any[] = Object.entries(Language).map(([key, value]) => ({
    text: t(`LANGUAGES.${key}`),
    value,
  }))

  const onSaveHandler = () => {
    setLocale(form.value.language)
  }

  return {
    form,
    languages,
    onSaveHandler,
    color: $getColor(Colors.PRIMARY_RED),
  }
}
