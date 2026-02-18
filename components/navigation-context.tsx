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
}

const NavigationContext = createContext<NavigationContextType>({
  isNavigating: false,
  startNavigation: () => {},
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
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentPath, setCurrentPath] = useState(pathname)

  const startNavigation = useCallback(() => {
    setIsNavigating(true)
  }, [])

  useEffect(() => {
    if (pathname !== currentPath) {
      setCurrentPath(pathname)
      // Small delay so the new page content renders before we hide the loader
      const timer = setTimeout(() => setIsNavigating(false), 15)
      return () => clearTimeout(timer)
    }
  }, [pathname, currentPath])

  return (
    <NavigationContext value={{ isNavigating, startNavigation }}>
      {children}
    </NavigationContext>
  )
}
