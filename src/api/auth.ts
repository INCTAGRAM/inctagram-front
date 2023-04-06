import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://inctagram.onrender.com/api',
})

export const authAPI = {
  registration(data: RegistrationDateType) {
    return instance.post('/auth/registration', data).then((res) => res.data)
  },
  test() {
    return axios.get('https://jsonplaceholder.typicode.com/posts/1')
  },
}

type RegistrationDateType = {
  email: string
  password: string
}
