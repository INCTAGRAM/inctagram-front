import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styles from './ControlElement.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'

interface IControlElementProps {
  icon: string
  elementClass: string
}

export const ControlElement = ({ children, icon, elementClass }: PropsWithChildren<IControlElementProps>) => {
  const [open, setOpen] = useState(true)

  const control = useRef(null as HTMLDivElement | null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: Event) => {
      if (!control.current) return
      if (!e.target) return
      if (!control.current.contains(e.target as HTMLElement)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [open])

  return (
    <>
      <div ref={control} className={`${styles.controlElement} ${styles[elementClass]}`} onClick={() => setOpen(true)}>
        {open && children}
        <IcomoonReact iconSet={iconSet} color={open ? '#397DF6' : '#fff'} icon={icon} size={24} />
      </div>
    </>
  )
}
