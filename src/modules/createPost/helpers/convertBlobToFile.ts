export const convertBlobToFile = async (image: RequestInfo | URL, index: number) => {
  try {
    const response = await fetch(image)
    const blob = await response.blob()
    return new File([blob], `image${index + 1}.jpg`, { type: blob.type })
  } catch (error) {
    console.error(error)
  }
}
