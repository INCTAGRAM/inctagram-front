export const getConvertedDate = (date: any) => {
  const dataArr = date.split(' / ')
  const day = dataArr[0]
  const month = dataArr[1] - 1
  const year = dataArr[2]
  const convertedDate = '0' + day + ' - ' + '0' + month + ' - ' + year.slice(1)
  return convertedDate
}
