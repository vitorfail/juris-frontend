"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTasks, mockHearings, getUserName, getCaseNumber } from "@/lib/mock-data"
import { CalendarDays, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { formatMonthShort, formatDay, formatTimeBR, formatDateBR } from "@/lib/format"

const upcomingHearings = mockHearings
  .sort(
    (a, b) =>
      new Date(a.hearing_date).getTime() - new Date(b.hearing_date).getTime()
  )
  .slice(0, 3)

const recentTasks = mockTasks
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
  .slice(0, 5)

function taskStatusBadge(status: string) {
  switch (status) {
    case "done":
      return (
        <Badge
          variant="secondary"
          className="bg-success/10 text-success border-none text-[10px]"
        >
          <CheckCircle2 className="mr-0.5 size-3" />
          Concluida
        </Badge>
      )
    case "late":
      return (
        <Badge
          variant="secondary"
          className="bg-destructive/10 text-destructive border-none text-[10px]"
        >
          <AlertTriangle className="mr-0.5 size-3" />
          Atrasada
        </Badge>
      )
    default:
      return (
        <Badge
          variant="secondary"
          className="bg-warning/10 text-warning border-none text-[10px]"
        >
          <Clock className="mr-0.5 size-3" />
          Pendente
        </Badge>
      )
  }
}

export function RecentActivity() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Upcoming Hearings */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CalendarDays className="size-4 text-primary" />
            Proximas Audiencias
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {upcomingHearings.map((hearing) => (
            <div
              key={hearing.id}
              className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
            >
              <div className="flex flex-col items-center rounded-md bg-primary/10 px-2.5 py-1.5">
                <span className="text-[10px] font-medium text-primary">
                  {formatMonthShort(hearing.hearing_date)}
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatDay(hearing.hearing_date)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-xs font-medium text-foreground">
                  {hearing.type}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {getCaseNumber(hearing.case_id)}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {hearing.location}
                </span>
              </div>
              <span className="text-xs font-medium text-primary">
                {formatTimeBR(hearing.hearing_date)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CheckCircle2 className="size-4 text-primary" />
            Tarefas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary/50"
            >
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="text-xs font-medium text-foreground">
                  {task.title}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {task.assigned_to
                    ? getUserName(task.assigned_to)
                    : "Sem responsavel"}
                  {task.due_date &&
                    ` - Prazo: ${formatDateBR(task.due_date)}`}
                </span>
              </div>
              {taskStatusBadge(task.status)}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
