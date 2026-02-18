"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export function RouteLoader() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      setPrevPathname(pathname)
      setIsLoading(false)
    }
  }, [pathname, prevPathname])

  return { isLoading, setIsLoading }
}

export function RouteLoaderOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-[2px] transition-opacity duration-200 animate-in fade-in">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-10 animate-ping rounded-full bg-primary/20" />
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          Carregando...
        </span>
      </div>
    </div>
  )
}
