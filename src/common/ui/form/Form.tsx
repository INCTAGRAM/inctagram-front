import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import styles from './Form.module.scss'
import { ExternalLinks } from '@/constants/routes'

interface IFormProps {
  title: string
  isTopPanel?: boolean
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  redirect?: IRedirect
  login?: any
}

interface IRedirect {
  title?: string
  link: string
  linkTitle: string
}

const Form = ({ title, onSubmit, redirect, isTopPanel, children, login }: PropsWithChildren<IFormProps>) => {
  return (
    <div className={styles.block}>
      <h1>{title}</h1>
      <div className={styles.content}>
        {isTopPanel && (
          <div className={styles.form_icons}>
            <IcomoonReact
              icon={'google-svgrepo-com-1'}
              iconSet={iconSet}
              size={36}
              onClick={() => login && login()}
              style={{ cursor: 'pointer' }}
            />
            <Link href={ExternalLinks.github}>
              <IcomoonReact icon={'github-svgrepo-com-3-1'} iconSet={iconSet} color={'#fff'} size={36} />
            </Link>
          </div>
        )}
        <form onSubmit={onSubmit}>{children}</form>
        {redirect && (
          <div className={styles.form_footer}>
            {redirect.title && <p>{redirect.title}</p>}
            <Link href={redirect.link}>{redirect.linkTitle}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Form
