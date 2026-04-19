"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { CrmSidebar } from "@/components/crm-sidebar"
import { NavigationProvider } from "@/components/navigation-context"
import { ContentArea } from "@/components/content-area"
import { getApiConfig } from "@/lib/api"
import { Loader2 } from "lucide-react"

export function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)
  const isLoginPage = pathname === "/login"

  useEffect(() => {
    const cfg = getApiConfig()
    if (!isLoginPage && !cfg?.token) {
      router.push("/login")
    } else {
      setIsVerifying(false)
    }
  }, [isLoginPage, router])

  if (isVerifying && !isLoginPage) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-background">{children}</div>
  }

  return (
    <NavigationProvider>
      <SidebarProvider>
        <CrmSidebar />
        <SidebarInset>
          <ContentArea>{children}</ContentArea>
        </SidebarInset>
      </SidebarProvider>
    </NavigationProvider>
  )
}
