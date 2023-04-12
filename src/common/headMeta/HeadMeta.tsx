import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'

interface IMeta {
  title: string
  description?: string | undefined
}

const HeadMeta: NextPage<PropsWithChildren<IMeta>> = ({ title, description, children }) => {
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
      </Head>
      {children}
    </>
  )
}

export default HeadMeta
