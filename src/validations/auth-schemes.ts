import * as yup from 'yup'

const emailRegExp = /^\w[\w-.]*@[\w-]+\.[a-z]{2,7}$/i

export const recoverySchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'email must be a valid email').required(),
})

export const newPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(6).max(20).required(),
  passwordConfirmation: yup.string().min(6).max(20).required(),
})
