export const getBrowser = (userAgent: string) => {
  let browserName

  switch (true) {
    case userAgent.indexOf('Firefox') > -1:
      browserName = 'Mozilla Firefox'
      break
    case userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1:
      browserName = 'Opera'
      break
    case userAgent.indexOf('Trident') > -1 || userAgent.indexOf('MSIE') > -1:
      browserName = 'Microsoft Internet Explorer'
      break
    case userAgent.indexOf('Edge') > -1:
      browserName = 'Microsoft Edge'
      break
    case userAgent.indexOf('Chrome') > -1:
      browserName = 'Google Chrome'
      break
    case userAgent.indexOf('Safari') > -1:
      browserName = 'Apple Safari'
      break
    default:
      browserName = 'Unknown browser'
  }

  return browserName
}
