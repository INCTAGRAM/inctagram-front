import dayjs from 'dayjs'
export const formatDateOfBirth = (date: string) => dayjs(date).format('D MMM YYYY')
