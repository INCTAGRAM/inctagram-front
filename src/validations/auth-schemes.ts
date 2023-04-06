import * as yup from 'yup'

const emailRegExp = /^\w[\w-.]*@[\w-]+\.[a-z]{2,7}$/i

export const recoverySchema = yup.object().shape({
  email: yup.string().required().matches(emailRegExp, 'email must be a valid email'),
})
