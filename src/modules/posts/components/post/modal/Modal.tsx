import React, { ReactElement, ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ children }: any): any => {
  const containerElement = document.querySelector('#modal-container')

  if (children && containerElement) {
    return createPortal(children, containerElement)
  }
}

export default Modal
