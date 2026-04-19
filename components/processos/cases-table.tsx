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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCases, useClients, useUsers } from "@/lib/hooks"
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react"
import { CaseFormDialog } from "./case-form-dialog"

function statusBadge(status: string | undefined) {
  switch (status) {
    case "ativo":
      return (
        <Badge variant="secondary" className="bg-success/10 text-success border-none text-[10px]">
          Ativo
        </Badge>
      )
    case "suspenso":
      return (
        <Badge variant="secondary" className="bg-warning/10 text-warning border-none text-[10px]">
          Suspenso
        </Badge>
      )
    case "encerrado":
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[10px]">
          Encerrado
        </Badge>
      )
    case "arquivado":
      return (
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground border-none text-[10px]">
          Arquivado
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="border-none text-[10px]">
          {status || "-"}
        </Badge>
      )
  }
}

export function CasesTable() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data: cases, isLoading } = useCases()
  const { data: clients } = useClients()
  const { data: users } = useUsers()

  const getClientName = (id: string) => {
    return (clients || []).find((c) => c.id === id)?.name || "Nao encontrado"
  }

  const getUserName = (id: string) => {
    return (users || []).find((u) => u.id === id)?.name || "Nao atribuido"
  }

  const filtered = (cases || []).filter((c) => {
    const matchesSearch =
      c.case_number?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      getClientName(c.client_id).toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground">Carregando processos...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar processo..."
              className="h-9 w-full bg-secondary pl-8 text-xs sm:w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="size-3.5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">Todos</SelectItem>
                <SelectItem value="ativo" className="text-xs">Ativos</SelectItem>
                <SelectItem value="suspenso" className="text-xs">Suspensos</SelectItem>
                <SelectItem value="encerrado" className="text-xs">Encerrados</SelectItem>
                <SelectItem value="arquivado" className="text-xs">Arquivados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Plus className="size-3.5" />
          Novo Processo
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs">Numero</TableHead>
              <TableHead className="text-xs">Cliente</TableHead>
              <TableHead className="hidden text-xs md:table-cell">Area</TableHead>
              <TableHead className="hidden text-xs lg:table-cell">Vara / Tribunal</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="hidden text-xs md:table-cell">Advogado</TableHead>
              <TableHead className="hidden text-xs lg:table-cell text-right">Valor</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.id} className="group">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground font-mono">
                      {c.case_number || "Sem numero"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {c.distribution_date
                        ? new Date(c.distribution_date).toLocaleDateString("pt-BR")
                        : "-"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-foreground">
                  {getClientName(c.client_id)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-[10px]">
                    {c.area || "-"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground lg:table-cell max-w-48 truncate">
                  {c.court || "-"}
                </TableCell>
                <TableCell>{statusBadge(c.status)}</TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                  {c.responsible_lawyer_id
                    ? getUserName(c.responsible_lawyer_id)
                    : "-"}
                </TableCell>
                <TableCell className="hidden text-xs text-right font-medium lg:table-cell">
                  {c.value
                    ? `R$ ${c.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                    : "-"}
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

      <CaseFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
