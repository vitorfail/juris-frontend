"use client"

import { useNavigation } from "@/components/navigation-context"
import { Loader2 } from "lucide-react"

export function ContentArea({ children }: { children: React.ReactNode }) {
  const { isNavigating } = useNavigation()

  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      {children}
      {isNavigating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-[2px] animate-in fade-in duration-150">
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
      )}
    </div>
  )
}
