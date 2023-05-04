import { NextPageWithLayout } from '@/pages/_app'
import { authService } from '@/services/auth/authService'
import HeadMeta from '@/common/headMeta/HeadMeta'
import RegistrationSuccessPage from '@/features/screens/feedbackPages/RegistrationSuccessPage'
import ExpiredPage from '@/features/screens/feedbackPages/ExpiredPage'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { AxiosError } from 'axios'
import { AlertSnackbar } from '@/common/alertSnackbar/AlertSnackbar'
import { errorHandler } from '@/hooks/errorsHandler'
import { Button } from '@/common/ui/button/Button'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'

interface IConfirmation {
  isSuccess: boolean
  email?: string
  message?: string
  errorStatus?: number | null
}

interface IContext {
  query: {
    code?: string
    email?: string
  }
}

export const getServerSideProps = async (context: IContext) => {
  try {
    await authService.confirmation(context.query.code ? context.query.code : '')
    return {
      props: {
        isSuccess: true,
      },
    }
  } catch (e) {
    const err = e as AxiosError
    return {
      props: {
        isSuccess: false,
        email: context.query.email ? context.query.email : '',
        message: errorHandler(err),
        errorStatus: err.response?.status ? err.response.status : null,
      },
    }
  }
}

const Confirmation: NextPageWithLayout<IConfirmation> = ({ message, errorStatus, email, isSuccess }) => {
  const { push } = useRouter()
  if (isSuccess) {
    return (
      <HeadMeta title={'Congratulations'}>
        <RegistrationSuccessPage />
      </HeadMeta>
    )
  } else if (errorStatus === 410) {
    return (
      <HeadMeta title={'Expired'}>
        <ExpiredPage email={email ? email : ''} />
      </HeadMeta>
    )
  } else {
    return (
      <HeadMeta title={'Error'}>
        <Button onClick={() => push(RouteNames.LOGIN)}>Go to log in page</Button>
        <br />
        <br />
        <Button onClick={() => push(RouteNames.REGISTER)}>Go to registration page</Button>
        {!isSuccess && <AlertSnackbar type={'error'} error={message ? message : ''} />}
      </HeadMeta>
    )
  }
}

Confirmation.getLayout = getBaseLayout
export default Confirmation
