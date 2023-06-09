import { DependencyList, useEffect } from 'react'

export const useScrollEvent = (callBack: () => void, deps?: DependencyList | undefined) => {
  useEffect(() => {
    document.addEventListener('scroll', callBack)
    return () => {
      document.removeEventListener('scroll', callBack)
    }
  }, deps)
}
