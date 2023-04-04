import React from 'react'
import styles from './RecoveryForm.module.scss'
import Link from 'next/link'

interface IAuthProps {
  title: string
  subLink?: string
  subLinkTitle?: string
}

const RecoveryForm = ({ title, subLink, subLinkTitle, children }: IAuthProps) => {
  return (
    <div className={styles.block}>
      <h1>{title}</h1>
      {children}
      {subLink && subLinkTitle && (
        <Link className={styles.link} href={subLink}>
          {subLinkTitle}
        </Link>
      )}
    </div>
  )
}

export default RecoveryForm
