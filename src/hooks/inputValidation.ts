import * as yup from 'yup'

export const inputSchema = yup.object({
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  password: yup.string().min(6, 'Длина пароля не менее 6 символов').required('Обязательное поле'),
})
