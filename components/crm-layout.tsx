"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { CrmSidebar } from "@/components/crm-sidebar"
import { NavigationProvider } from "@/components/navigation-context"
import { ContentArea } from "@/components/content-area"

export function CrmLayout({ children }: { children: React.ReactNode }) {
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
