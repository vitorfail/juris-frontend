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
import { useClients, useCases } from "@/lib/hooks"
import { useDebounce } from "@/hooks/use-debounce"
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
  const debouncedSearch = useDebounce(search, 500)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const { data: pagination, isLoading } = useClients(page, size, debouncedSearch)
  const { data: cases } = useCases()

  const clients = pagination?.items || []
  const total = pagination?.total || 0
  const pages = pagination?.pages || 0

  function getCasesCount(clientId: string) {
    return (cases || []).filter((c) => c.client_id === clientId).length
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

  if (isLoading && !pagination) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground">Carregando clientes...</span>
        </div>
      </div>
    )
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
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1) // Reset to first page on search
            }}
          />
        </div>
        <div className="flex items-center gap-2">
           <select 
            className="h-9 rounded-md border bg-secondary px-2 text-xs"
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value))
              setPage(1)
            }}
          >
            <option value={10}>10 por pagina</option>
            <option value={20}>20 por pagina</option>
            <option value={50}>50 por pagina</option>
          </select>
          <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
            <Plus className="size-3.5" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
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
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-xs text-muted-foreground">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <span className="text-[10px] text-muted-foreground">
          Mostrando {clients.length} de {total} clientes
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[10px]"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-medium">Pagina {page}</span>
            <span className="text-[10px] text-muted-foreground">de {pages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[10px]"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages || pages === 0}
          >
            Proximo
          </Button>
        </div>
      </div>

      <ClientFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
