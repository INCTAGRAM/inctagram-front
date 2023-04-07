import { object, string } from 'yup'

export const schema = object().shape({
  email: string().required().email(),
  password: string().required().min(6).max(20),
})
