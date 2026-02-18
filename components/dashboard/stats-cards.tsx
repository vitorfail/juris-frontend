"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, CheckSquare, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { mockClients, mockCases, mockTasks, mockFinancialRecords } from "@/lib/mock-data"

const stats = [
  {
    title: "Clientes Ativos",
    value: mockClients.length,
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Processos Ativos",
    value: mockCases.filter((c) => c.status === "ativo").length,
    change: "+8%",
    trend: "up" as const,
    icon: Briefcase,
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    title: "Tarefas Pendentes",
    value: mockTasks.filter((t) => t.status === "pending").length,
    change: "-3%",
    trend: "down" as const,
    icon: CheckSquare,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Receita Total",
    value: `R$ ${(mockFinancialRecords.filter((f) => f.paid_at).reduce((acc, f) => acc + f.amount, 0) / 1000).toFixed(0)}k`,
    change: "+22%",
    trend: "up" as const,
    icon: DollarSign,
    color: "bg-success/10 text-success",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </span>
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
              </div>
              <div className={`flex size-10 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {stat.trend === "up" ? (
                <TrendingUp className="size-3 text-success" />
              ) : (
                <TrendingDown className="size-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">vs. mes anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
