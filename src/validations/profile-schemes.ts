import * as yup from 'yup'

export const changeProfileSchema = yup.object().shape({
  username: yup.string().min(6).max(30),
  name: yup.string().min(1).max(40),
  surname: yup.string().min(1).max(40),
  birthday: yup.date(),
  city: yup.string().min(1).max(60),
  aboutMe: yup.string().min(1).max(200),
})
