"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTasks, useCases, useUsers } from "@/lib/hooks"
import {
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react"
import type { Task } from "@/lib/types"

const columns = [
  {
    id: "pending" as const,
    title: "Pendentes",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "late" as const,
    title: "Atrasadas",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    id: "done" as const,
    title: "Concluidas",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
]

function TaskCard({ 
  task, 
  getCaseNumber, 
  getUserName 
}: { 
  task: Task, 
  getCaseNumber: (id: string) => string, 
  getUserName: (id: string) => string 
}) {
  return (
    <div className="group rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <h4 className="text-xs font-medium text-foreground leading-relaxed">{task.title}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 shrink-0 opacity-0 group-hover:opacity-100"
            >
              <MoreHorizontal className="size-3" />
              <span className="sr-only">Acoes</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem className="text-xs gap-2">
              <Pencil className="size-3" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs gap-2 text-destructive">
              <Trash2 className="size-3" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {task.description && (
        <p className="mt-1 text-[10px] text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {task.case_id && (
          <Badge variant="outline" className="text-[9px] font-mono px-1.5">
            {getCaseNumber(task.case_id).split(".")[0]}...
          </Badge>
        )}
        {task.due_date && (
          <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
            <Calendar className="size-2.5" />
            {new Date(task.due_date).toLocaleDateString("pt-BR")}
          </div>
        )}
      </div>
      {task.assigned_to && (
        <div className="mt-2 text-[10px] text-muted-foreground">
          {getUserName(task.assigned_to)}
        </div>
      )}
    </div>
  )
}

export function TasksBoard() {
  const [search, setSearch] = useState("")
  const { data: tasks, isLoading } = useTasks()
  const { data: cases } = useCases()
  const { data: users } = useUsers()

  const getCaseNumber = (id: string) => {
    return (cases || []).find((c) => c.id === id)?.case_number || "Sem numero"
  }

  const getUserName = (id: string) => {
    return (users || []).find((u) => u.id === id)?.name || "Nao atribuido"
  }

  const filtered = (tasks || []).filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-xs text-muted-foreground">Carregando tarefas...</span>
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
            placeholder="Buscar tarefa..."
            className="h-9 w-full bg-secondary pl-8 text-xs sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Nova Tarefa
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col.id)
          return (
            <Card key={col.id} className="border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex size-6 items-center justify-center rounded-md ${col.bgColor}`}>
                      <col.icon className={`size-3.5 ${col.color}`} />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{col.title}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] border-none">
                    {colTasks.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {colTasks.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-xs text-muted-foreground">
                      Nenhuma tarefa
                    </p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      getCaseNumber={getCaseNumber}
                      getUserName={getUserName}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
