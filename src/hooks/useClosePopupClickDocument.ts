import { DependencyList, RefObject, useEffect } from 'react'

export const useClosePopupClickDocument = (
  ref: RefObject<HTMLDivElement>,
  isOpen: boolean,
  callBack: () => void,
  deps?: DependencyList
) => {
  useEffect(() => {
    if (!isOpen) return
    if (!ref.current) return

    const handleClick = (e: Event) => {
      if (!ref.current) return
      if (!e.target) return

      if (!ref.current.contains(e.target as HTMLElement)) {
        callBack()
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      if (!ref.current) return
      document.removeEventListener('click', handleClick)
    }
  }, deps)
}
