"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, CheckSquare, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useClientsSummary, useCasesSummary, useTasksSummary, useFinancialRecords } from "@/lib/hooks"
import { useNavigation } from "@/components/navigation-context"
import { useEffect } from "react"

export function StatsCards() {
  const { data: clientsSummary, isLoading: l1 } = useClientsSummary()
  const { data: casesSummary, isLoading: l2 } = useCasesSummary()
  const { data: tasksSummary, isLoading: l3 } = useTasksSummary()
  const { data: financial, isLoading: l4 } = useFinancialRecords()

  const { startNavigation, stoptNavigation } = useNavigation()
  const isLoading = l1 || l2 || l3 || l4

  useEffect(() => {
    if (isLoading) {
      startNavigation()
      return () => stoptNavigation()
    }
  }, [isLoading, startNavigation, stoptNavigation])

  const stats = [
    {
      title: "Clientes Ativos",
      value: clientsSummary?.total ?? 0,
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Processos Ativos",
      value: casesSummary?.active_cases ?? 0,
      change: "+8%",
      trend: "up" as const,
      icon: Briefcase,
      color: "bg-chart-2/10 text-chart-2",
    },
    {
      title: "Tarefas Pendentes",
      value: tasksSummary?.pending ?? 0,
      change: "-3%",
      trend: "down" as const,
      icon: CheckSquare,
      color: "bg-warning/10 text-warning",
    },
    {
      title: "Receita Total",
      value: `R$ ${((financial || []).filter((f) => f.paid_at).reduce((acc, f) => acc + f.amount, 0) / 1000).toFixed(0)}k`,
      change: "+22%",
      trend: "up" as const,
      icon: DollarSign,
      color: "bg-success/10 text-success",
    },
  ]

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
