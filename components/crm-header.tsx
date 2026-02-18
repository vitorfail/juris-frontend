"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CrmHeader({ title }: { title: string }) {
  return (
    <header className="flex h-14 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />
      <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="h-8 w-56 bg-secondary pl-8 text-xs"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4 text-muted-foreground" />
          <Badge className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center p-0 text-[9px]">
            3
          </Badge>
          <span className="sr-only">Notificacoes</span>
        </Button>
      </div>
    </header>
  )
}
