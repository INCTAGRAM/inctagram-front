import * as yup from 'yup'

export const changeProfileSchema = yup.object().shape({
  username: yup.string().min(6).max(30),
  name: yup.string().max(40),
  surname: yup.string().max(40),
  birthday: yup.date(),
  city: yup.string().max(60),
  aboutMe: yup.string().max(200),
})
