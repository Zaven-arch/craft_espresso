export const getImageAsFile = async (data: any): Promise<File | null> => {
  if (!data?.url) {
    return null
  }

  const { data: image }: any = await useFetch(data?.url, {
    onResponse: ({ response }) => {
      const file = new File([response._data], data?.filename, {
        type: response.headers?.get('content-type') ?? '',
      })

      response._data = file
    },
  })

  return image.value as File
}
