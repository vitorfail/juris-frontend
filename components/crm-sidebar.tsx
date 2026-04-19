"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  DollarSign,
  Calendar,
  Scale,
  Settings,
  LogOut,
} from "lucide-react"
import { useNavigation } from "@/components/navigation-context"
import { logout } from "@/lib/api"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const mainNav = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Processos",
    href: "/processos",
    icon: Briefcase,
  },
  {
    title: "Tarefas",
    href: "/tarefas",
    icon: CheckSquare,
  },
  {
    title: "Agenda",
    href: "/agenda",
    icon: Calendar,
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
  },
]

const systemNav = [
  {
    title: "Configuracoes",
    href: "/configuracoes",
    icon: Settings,
  },
]

export function CrmSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { startNavigation } = useNavigation()

  const handleNavClick = useCallback(
    (href: string) => {
      const isActive =
        href === "/" ? pathname === "/" : pathname.startsWith(href)
      if (!isActive) {
        startNavigation()
      }
    },
    [pathname, startNavigation]
  )

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Scale className="size-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
              LexCRM
            </span>
            <span className="text-[10px] text-sidebar-foreground/60">
              Gestao Juridica
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href)
                    }
                    tooltip={item.title}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.title}
                  >
                    <Link
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Dr. Ricardo Mendes">
              <Avatar className="size-7">
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                  RM
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-xs font-medium text-sidebar-foreground">
                  Dr. Ricardo Mendes
                </span>
                <span className="text-[10px] text-sidebar-foreground/60">
                  Administrador
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sair"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
              onClick={() => {
                logout()
                router.push("/login")
              }}
            >
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
