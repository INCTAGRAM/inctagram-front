import { profileService } from '@/services'
import axios, { AxiosError } from 'axios'

export const addUserPhoto = async (file: File) => {
  if (file.size < 2000000) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      await profileService.uploadAvatar(formData)
    } catch (error) {
      const err = error as Error | AxiosError
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.message[0] : err.message
        console.log(error)
      } else {
        console.log(`Native error ${err.message}`)
      }
    }
  } else {
    console.error('Error: ', 'Файл слишком большого размера')
  }
}
