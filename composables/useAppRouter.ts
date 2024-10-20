/* eslint-disable no-undef */

export const useAppRouter = () => {
  const localePath: any = useLocalePath()

  const $router = useRouter()

  const goBackByReferrer = () => {
    const [, , , , ...url] = document.referrer.split('/')

    return $router.push(localePath(`/${url.join('/')}`))
  }

  const goBack = () => $router.go(-1)

  const goTo = (path: string) => $router.push(localePath(path))

  const goToInNewTab = (path: string) => window.open($router.resolve(localePath(path)).href, '_blank')

  return {
    goTo,
    goToInNewTab,
    goBack,
    goBackByReferrer,
  }
}
