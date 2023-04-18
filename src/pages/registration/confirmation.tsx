import { NextPageWithLayout } from '@/pages/_app'
import { authService } from '@/services/auth/authService'
import HeadMeta from '@/common/headMeta/HeadMeta'
import RegistrationSuccessPage from '@/features/screens/feedbackPages/RegistrationSuccessPage'
import ExpiredPage from '@/features/screens/feedbackPages/ExpiredPage'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { AxiosError } from 'axios'
import { INewPasswordError } from '@/services/auth/types'

interface IConfirmation {
  isSuccess: boolean
  email: string
  message: string
}

interface IContext {
  query: {
    code?: string
    email?: string
  }
}

export const getServerSideProps = async (context: IContext) => {
  try {
    await authService.confirmation(context.query.code ?? '')

    return {
      props: {
        isSuccess: true,
        email: '',
        message: '',
      },
    }
  } catch (e) {
    const err = e as AxiosError<INewPasswordError>
    return {
      props: {
        isSuccess: false,
        email: context.query.email ? context.query.email : '',
        message: err.response?.data.message[0],
      },
    }
  }
}

const Confirmation: NextPageWithLayout<IConfirmation> = ({ message, email, isSuccess }) => {
  if (isSuccess) {
    return (
      <HeadMeta title={'Congratulations'}>
        <RegistrationSuccessPage />
      </HeadMeta>
    )
  } else if (message === 'User code has expired' || message === 'No user exists with the given confirmation code') {
    return (
      <HeadMeta title={'Expired'}>
        <ExpiredPage email={email} />
      </HeadMeta>
    )
  } else {
    return null
  }
}

Confirmation.getLayout = getBaseLayout
export default Confirmation
