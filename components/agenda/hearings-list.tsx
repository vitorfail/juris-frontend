"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockHearings, getCaseNumber } from "@/lib/mock-data"
import { Plus, MapPin, Clock, FileText } from "lucide-react"

const sortedHearings = [...mockHearings].sort(
  (a, b) => new Date(a.hearing_date).getTime() - new Date(b.hearing_date).getTime()
)

function getMonthGroup(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
}

const grouped = sortedHearings.reduce(
  (acc, h) => {
    const key = getMonthGroup(h.hearing_date)
    if (!acc[key]) acc[key] = []
    acc[key].push(h)
    return acc
  },
  {} as Record<string, typeof sortedHearings>
)

export function HearingsList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div />
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          Nova Audiencia
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(grouped).map(([month, hearings]) => (
          <div key={month} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {month}
            </h3>
            <div className="flex flex-col gap-2">
              {hearings.map((hearing) => {
                const date = new Date(hearing.hearing_date)
                return (
                  <Card key={hearing.id} className="border-none shadow-sm">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex flex-col items-center rounded-xl bg-primary/10 px-3 py-2 min-w-14">
                        <span className="text-[10px] font-semibold text-primary uppercase">
                          {date.toLocaleDateString("pt-BR", { weekday: "short" })}
                        </span>
                        <span className="text-xl font-bold text-primary">
                          {date.getDate()}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {hearing.type || "Audiencia"}
                          </span>
                          <Badge variant="outline" className="text-[9px] font-mono">
                            {getCaseNumber(hearing.case_id).split("-")[0]}...
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="size-3" />
                            {date.toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {hearing.location && (
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                              <MapPin className="size-3" />
                              {hearing.location}
                            </div>
                          )}
                        </div>
                        {hearing.notes && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <FileText className="size-2.5" />
                            {hearing.notes}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
