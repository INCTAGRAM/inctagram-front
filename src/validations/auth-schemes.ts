import * as yup from 'yup'

const emailRegExp = /^\w[\w-.]*@[\w-]+\.[a-z]{2,7}$/i

export const loginSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Email must be profileSettings valid').required(),
  password: yup.string().min(6).max(20).required(),
})

export const registrationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().matches(emailRegExp, 'Email must be profileSettings valid').required(),
  password: yup.string().min(6).max(20).required(),
  passwordConfirmation: yup
    .string()
    .min(6)
    .max(20)
    .oneOf([yup.ref('password')], 'The password must match the new password')
    .required(),
})

export const recoverySchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Email must be profileSettings valid').required(),
})

export const newPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(6).max(20).required(),
  passwordConfirmation: yup
    .string()
    .min(6)
    .max(20)
    .oneOf([yup.ref('newPassword')], 'The password must match the new password')
    .required(),
})
