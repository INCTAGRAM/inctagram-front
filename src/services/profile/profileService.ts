import { instance } from '@/services/config'
import {
  IProfileData,
  IProfileResponse,
  IProfileSettingResponse,
  IUploadAvatarResponse,
} from '@/services/profile/types'

export const profileService = {
  checkUserProfile: () => {
    return instance.get<IProfileResponse>(`/users/self/profile`).then((response) => response.data)
  },
  uploadAvatar: (payload: FormData) => {
    return instance
      .post<IUploadAvatarResponse>(`/users/self/images/avatar`, payload)
      .then((response) => response && response.data)
  },
  updateUserProfile: (payload: IProfileData) => {
    return instance.put<IProfileSettingResponse>(`/users/self/profile`, payload).then((response) => response.data)
  },
}
