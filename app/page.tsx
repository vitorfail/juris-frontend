import { CrmHeader } from "@/components/crm-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CasesChart } from "@/components/dashboard/cases-chart"
import { AreaDistributionChart } from "@/components/dashboard/area-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  return (
    <>
      <CrmHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Bem-vindo, Dr. Ricardo
          </h2>
          <p className="text-sm text-muted-foreground">
            Aqui esta o resumo do seu escritorio hoje.
          </p>
        </div>

        <StatsCards />

        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CasesChart />
          </div>
          <div className="lg:col-span-2">
            <AreaDistributionChart />
          </div>
        </div>

        <RecentActivity />
      </div>
    </>
  )
}
