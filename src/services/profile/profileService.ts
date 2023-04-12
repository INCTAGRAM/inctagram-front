import { instance } from '@/services/config'
import { IProfileData, IUploadAvatarData, IUploadAvatarResponse } from '@/services/profile/profileServiceTypes'

export const profileService = {
  createProfile: (payload: IProfileData, id: string) => {
    return instance.post(`/users/${id}/profile`, payload)
  },
  checkUserProfile: (id: string) => {
    return instance.get(`/users/${id}/profile`).then((response) => response.data)
  },
  uploadAvatar: (payload: IUploadAvatarData, id: string) => {
    return instance.post<IUploadAvatarResponse>(`/users/${id}/images/avatar`, payload).then((response) => response.data)
  },
  updateUserProfile: (payload: IProfileData, id: string) => {
    return instance.put(`/users/${id}/profile`, payload)
  },
}
