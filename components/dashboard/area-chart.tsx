"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { useCases } from "@/lib/hooks"

const COLORS = [
  "var(--color-primary)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

export function AreaDistributionChart() {
  const { data: cases } = useCases()

  const areaCount = (cases || []).reduce(
    (acc, c) => {
      const area = c.area || "Outros"
      acc[area] = (acc[area] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const data = Object.entries(areaCount).map(([name, value]) => ({ name, value }))

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground">
          Processos por Area
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div
                className="size-2.5 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
