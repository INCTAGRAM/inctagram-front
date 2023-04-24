import { profileService } from '@/services/profile/profileService'
import axios, { AxiosError } from 'axios'

export const addUserPhoto = (file: File) => {
  console.log('file', file)
  try {
    if (file.size < 2000000) {
      const formData = new FormData()
      formData.append('file', file)
      profileService.uploadAvatar(formData)
    } else {
      console.error('Error: ', 'Файл слишком большого размера')
    }
  } catch (error) {
    const err = error as Error | AxiosError
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.message[0] : err.message
      console.log(error)
    } else {
      console.log(`Native error ${err.message}`)
    }
  }
}
