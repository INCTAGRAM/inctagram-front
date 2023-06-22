import { DependencyList, RefObject, useEffect } from 'react'

export const useScrollEvent = (
  scrollCallback: () => boolean,
  postsRef: RefObject<HTMLDivElement>,
  deps?: DependencyList
) => {
  const scrollHandler = () => {
    if (!postsRef.current) return

    const allScrollTop = window.scrollY + window.innerHeight
    if (allScrollTop + 100 > postsRef.current.offsetTop + postsRef.current.scrollHeight) {
      const success = scrollCallback()
      if (success) {
        document.removeEventListener('scroll', scrollHandler)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, deps)
}
