import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://inctagram.onrender.com/',
})
