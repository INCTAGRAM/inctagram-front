import * as yup from 'yup'

export const inputSchema = yup.object({
  email: yup.string().email('email must be a valid').required('Required field'),
  password: yup
    .string()
    .min(6, 'Password length is at least 6 characters')
    .max(20, 'Password length no more than 20 characters')
    .required('Required field'),
  passwordConfirmation: yup
    .string()
    .min(6, 'Password length is at least 6 characters')
    .max(20, 'Password length no more than 20 characters')
    .oneOf([yup.ref('password')], 'Password mismatch')
    .required('Required field'),
})
