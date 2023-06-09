import { DependencyList, RefObject, useEffect } from 'react'

export const useClosePopupClickEl = (
  ref: RefObject<HTMLDivElement>,
  isOpen: boolean,
  callBack: () => void,
  deps?: DependencyList | undefined
) => {
  useEffect(() => {
    if (!isOpen) return
    if (!ref.current) return

    const handleClick = (e: Event) => {
      if (!e.target) return
      if (ref.current === e.target) {
        callBack()
      }
    }

    ref.current.addEventListener('click', handleClick)
    return () => {
      if (!ref.current) return
      ref.current.removeEventListener('click', handleClick)
    }
  }, deps)
}
