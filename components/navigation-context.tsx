"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react"
import { usePathname } from "next/navigation"

type NavigationContextType = {
  isNavigating: boolean
  startNavigation: () => void
  stoptNavigation: () => void
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startNavigation: () => {},
  stoptNavigation: () => {}
})

export function useNavigation() {
  return useContext(NavigationContext)
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [navCount, setNavCount] = useState(0)
  const [currentPath, setCurrentPath] = useState(pathname)

  const isNavigating = navCount > 0

  const startNavigation = useCallback(() => {
    setNavCount((prev) => prev + 1)
  }, [])

  const stoptNavigation = useCallback(() => {
    setNavCount((prev) => Math.max(0, prev - 1))
  }, [])

  useEffect(() => {
    if (pathname !== currentPath) {
      setCurrentPath(pathname)
      startNavigation()
      let fired = false
      const timer = setTimeout(() => {
        fired = true
        stoptNavigation()
      }, 500) // Fallback for pages without API requests
      
      return () => {
        clearTimeout(timer)
        if (!fired) {
          stoptNavigation()
        }
      }
    }
  }, [pathname, currentPath, startNavigation, stoptNavigation])

  return (
    <NavigationContext value={{ isNavigating, startNavigation, stoptNavigation }}>
      {children}
    </NavigationContext>
  )
}
