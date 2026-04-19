"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { useFinancialRecords } from "@/lib/hooks"

function formatCurrency(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
}

export function FinancialOverview() {
  const { data: records } = useFinancialRecords()

  const totalFees = (records || [])
    .filter((f) => f.type === "fee")
    .reduce((acc, f) => acc + f.amount, 0)

  const totalPaid = (records || [])
    .filter((f) => f.paid_at)
    .reduce((acc, f) => acc + f.amount, 0)

  const totalPending = (records || [])
    .filter((f) => !f.paid_at)
    .reduce((acc, f) => acc + f.amount, 0)

  const totalPayments = (records || [])
    .filter((f) => f.type === "payment" && f.paid_at)
    .reduce((acc, f) => acc + f.amount, 0)

  const cards = [
    {
      title: "Total em Honorarios",
      value: formatCurrency(totalFees),
      icon: DollarSign,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Recebido",
      value: formatCurrency(totalPaid),
      icon: CheckCircle2,
      color: "bg-success/10 text-success",
    },
    {
      title: "A Receber",
      value: formatCurrency(totalPending),
      icon: AlertCircle,
      color: "bg-warning/10 text-warning",
    },
    {
      title: "Pagamentos Recebidos",
      value: formatCurrency(totalPayments),
      icon: TrendingUp,
      color: "bg-chart-2/10 text-chart-2",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {card.title}
                </span>
                <span className="text-lg font-bold tracking-tight text-foreground">
                  {card.value}
                </span>
              </div>
              <div className={`flex size-10 items-center justify-center rounded-xl ${card.color}`}>
                <card.icon className="size-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
