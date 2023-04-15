import { instance } from '@/services/config'

export const addUserPhoto = async (file: File) => {
  if (file.size < 2000000) {
    const formData = new FormData()
    formData.append('file', file)
    await instance.post<{ url: string; previewUrl: string }>('/users/self/images/avatar', formData)
  } else {
    console.error('Error: ', 'Файл слишком большого размера')
  }
}
