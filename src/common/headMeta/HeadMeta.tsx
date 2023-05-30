import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'

interface IMeta {
  title: string
  description?: string | undefined
  recaptcha?: boolean
}

const HeadMeta: NextPage<PropsWithChildren<IMeta>> = ({ title, description, recaptcha, children }) => {
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
        {recaptcha && (
          <script
            defer
            src="https://www.google.com/recaptcha/api.js?render=6Lfoc-8lAAAAAASNlkyDs89G9ZGBrEGNmTJEwshp"
          ></script>
        )}
      </Head>
      {children}
    </>
  )
}

export default HeadMeta
