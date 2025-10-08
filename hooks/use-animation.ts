import { useEffect, useState } from 'react'

export function useAnimation() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  
  return {
    isMounted,
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: isMounted ? 1 : 0 },
      transition: { duration: 0.5 }
    },
    slideIn: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 },
      transition: { duration: 0.5 }
    },
    slideInFromLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: isMounted ? 1 : 0, x: isMounted ? 0 : -20 },
      transition: { duration: 0.5 }
    },
    slideInFromRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: isMounted ? 1 : 0, x: isMounted ? 0 : 20 },
      transition: { duration: 0.5 }
    }
  }
}