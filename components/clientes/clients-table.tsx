"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockClients, mockCases } from "@/lib/mock-data"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Building2,
  User,
} from "lucide-react"
import { ClientFormDialog } from "./client-form-dialog"

export function ClientsTable() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filtered = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.document?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  )

  function getCasesCount(clientId: string) {
    return mockCases.filter((c) => c.client_id === clientId).length
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente..."
            className="h-9 w-full bg-secondary pl-8 text-xs sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Plus className="size-3.5" />
          Novo Cliente
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs">Cliente</TableHead>
              <TableHead className="text-xs">Tipo</TableHead>
              <TableHead className="hidden text-xs md:table-cell">Documento</TableHead>
              <TableHead className="hidden text-xs lg:table-cell">Email</TableHead>
              <TableHead className="hidden text-xs lg:table-cell">Telefone</TableHead>
              <TableHead className="text-xs">Estado</TableHead>
              <TableHead className="text-xs text-center">Processos</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((client) => (
              <TableRow key={client.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-foreground">
                      {client.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] border-none ${
                      client.type === "pj"
                        ? "bg-chart-2/10 text-chart-2"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {client.type === "pj" ? (
                      <Building2 className="mr-0.5 size-2.5" />
                    ) : (
                      <User className="mr-0.5 size-2.5" />
                    )}
                    {client.type === "pf" ? "Pessoa Fisica" : "Pessoa Juridica"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                  {client.document || "-"}
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                  {client.email || "-"}
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                  {client.phone || "-"}
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {client.estado || "-"}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="text-[10px] border-none">
                    {getCasesCount(client.id)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="size-3.5" />
                        <span className="sr-only">Acoes</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-xs gap-2">
                        <Eye className="size-3.5" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs gap-2">
                        <Pencil className="size-3.5" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-xs gap-2 text-destructive">
                        <Trash2 className="size-3.5" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ClientFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
