import * as yup from 'yup'

export const changeProfileSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  birthday: yup.date().required(),
  city: yup.string().required(),
  aboutMe: yup.string().required(),
})
