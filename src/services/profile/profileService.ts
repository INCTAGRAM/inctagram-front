import { instance } from '@/services/config'
import {
  IProfileData,
  IProfileResponse,
  IProfileSettingResponse,
  IUploadAvatarData,
  IUploadAvatarResponse,
} from '@/services/profile/types'

export const profileService = {
  createProfile: (payload: IProfileData) => {
    return instance.post(`/users/self/profile`, payload)
  },
  checkUserProfile: () => {
    return instance.get<IProfileResponse>(`/users/self/profile`).then((response) => response.data)
  },
  uploadAvatar: (payload: IUploadAvatarData) => {
    return instance.post<IUploadAvatarResponse>(`/users/self/images/avatar`, payload).then((response) => response.data)
  },
  updateUserProfile: (payload: IProfileData) => {
    return instance.put<IProfileSettingResponse>(`/users/self/profile`, payload).then((response) => response.data)
  },
}
