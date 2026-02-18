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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockFinancialRecords, getCaseNumber } from "@/lib/mock-data"
import { Search, Plus, Filter } from "lucide-react"

export function FinancialTable() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = mockFinancialRecords.filter((f) => {
    const matchesSearch =
      f.description?.toLowerCase().includes(search.toLowerCase()) ||
      getCaseNumber(f.case_id).toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || f.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar lancamento..."
              className="h-9 w-full bg-secondary pl-8 text-xs sm:w-72"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="size-3.5 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 w-36 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">Todos</SelectItem>
                <SelectItem value="fee" className="text-xs">Honorarios</SelectItem>
                <SelectItem value="payment" className="text-xs">Pagamentos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Novo Lancamento
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs">Descricao</TableHead>
              <TableHead className="text-xs">Processo</TableHead>
              <TableHead className="text-xs">Tipo</TableHead>
              <TableHead className="text-xs text-right">Valor</TableHead>
              <TableHead className="hidden text-xs md:table-cell">Vencimento</TableHead>
              <TableHead className="text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="text-xs font-medium text-foreground">
                  {record.description || "-"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[9px] font-mono">
                    {getCaseNumber(record.case_id).split("-")[0]}...
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] border-none ${
                      record.type === "fee"
                        ? "bg-primary/10 text-primary"
                        : "bg-chart-2/10 text-chart-2"
                    }`}
                  >
                    {record.type === "fee" ? "Honorario" : "Pagamento"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-xs font-semibold">
                  R$ {record.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                  {record.due_date
                    ? new Date(record.due_date).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell>
                  {record.paid_at ? (
                    <Badge
                      variant="secondary"
                      className="bg-success/10 text-success border-none text-[10px]"
                    >
                      Pago
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-warning/10 text-warning border-none text-[10px]"
                    >
                      Pendente
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
