import { RecoveryPage } from '@/modules/auth'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const Recovery: NextPageWithLayout = () => {
  return (
    <HeadMeta title={'Recovery password'} recaptcha={true}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '6Levy68lAAAAAPsTCNY-4RqECyLKGOl7kivcSdWh'}
      >
        <RecoveryPage />
      </GoogleReCaptchaProvider>
    </HeadMeta>
  )
}

Recovery.getLayout = getBaseLayout

export default Recovery
