import axios from 'axios'
import { NewPassword } from '@/services/intagram/types'

export const intagramApi = {
  newPassword: (payload: NewPassword) => {
    return axios.post('https://inctagram.onrender.com/api', { payload })
  },
}
