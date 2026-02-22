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
  const [isNavigating, setIsNavigating] = useState(true)
  const [currentPath, setCurrentPath] = useState(pathname)

  const startNavigation = useCallback(() => {
    setIsNavigating(true)
  }, [])
  const stoptNavigation = useCallback(() => {
    setIsNavigating(false)
  }, [])
  useEffect(() => {
    if (pathname !== currentPath) {
      setCurrentPath(pathname)
      // Small delay so the new page content renders before we hide the loader
    }
    stoptNavigation();
  }, [pathname, currentPath])

  return (
    <NavigationContext value={{ isNavigating, startNavigation,stoptNavigation }}>
      {children}
    </NavigationContext>
  )
}
