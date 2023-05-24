import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'

interface IMeta {
  title: string
  description?: string | undefined
  recaptcha?: boolean
  googleSignIn?: boolean
}

const HeadMeta: NextPage<PropsWithChildren<IMeta>> = ({ title, description, recaptcha, googleSignIn, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Inctagram</title>
        <meta name="og:title" content={title} />
        {description ?? (
          <>
            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
          </>
        )}
        {/*{googleSignIn && (*/}
        {/*  <meta*/}
        {/*    name="google-signin-client_id"*/}
        {/*    content="69255349786-mko80m2qf2l9vvdqlburo4dictmj7br8.apps.googleusercontent.com"*/}
        {/*  />*/}
        {/*)}*/}
        {recaptcha && (
          <script
            defer
            src="https://www.google.com/recaptcha/api.js?render=6Lfoc-8lAAAAAASNlkyDs89G9ZGBrEGNmTJEwshp"
          ></script>
        )}
        {/*{googleSignIn && <script src="https://apis.google.com/js/platform.js" async defer></script>}*/}
      </Head>
      {children}
    </>
  )
}

export default HeadMeta
