export default async (file: File) => new Promise((resolve) => {
  const reader = new FileReader()

  reader.onload = ({ target }: any) => resolve(target.result)

  reader.readAsText(file)
})
