import React, { PropsWithChildren, useRef, useState } from 'react'
import styles from './ControlCroppingElements.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { useClosePopupClickDocument } from '@/hooks/useClosePopupClickDocument'

interface IControlElementProps {
  icon: string
  elementClass: string
}

export const ControlCroppingElements = ({ children, icon, elementClass }: PropsWithChildren<IControlElementProps>) => {
  const [isOpen, setIsOpen] = useState(true)

  const control = useRef<HTMLDivElement>(null)

  const changeOpen = () => {
    setIsOpen(!isOpen)
  }

  useClosePopupClickDocument(control, isOpen, changeOpen, [isOpen])

  return (
    <>
      <div ref={control} className={`${styles.controlElement} ${styles[elementClass]}`} onClick={() => setIsOpen(true)}>
        {isOpen && children}
        <IcomoonReact iconSet={iconSet} color={isOpen ? '#397DF6' : '#fff'} icon={icon} size={24} />
      </div>
    </>
  )
}
