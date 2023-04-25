import axios, { AxiosError } from 'axios'

export const errorHandler = (e: Error | AxiosError<{ message: string[] }> | null) => {
  const err = e as Error | AxiosError<{ message: string[] }>

  if (axios.isAxiosError(err)) {
    return err.response?.data ? err.response.data.message[0] : err.message
  } else {
    return `Native error: ${err.message}`
  }
}
