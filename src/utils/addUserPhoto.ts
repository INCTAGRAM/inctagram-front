import { profileService } from '@/services/profile/profileService'
import axios, { AxiosError } from 'axios'

export const addUserPhoto = async (file: File) => {
  if (file.size < 2000000) {
    try {
      debugger
      const formData = new FormData()
      formData.append('file', file)
      await profileService.uploadAvatar(formData)
    } catch (error) {
      debugger
      const err = error as Error | AxiosError
      if (axios.isAxiosError(err)) {
        debugger
        const error = err.response?.data ? err.response.data.message[0] : err.message
        console.log(error)
      } else {
        debugger
        console.log(`Native error ${err.message}`)
      }
    }
  } else {
    console.error('Error: ', 'Файл слишком большого размера')
  }
}
