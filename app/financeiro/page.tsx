import { CrmHeader } from "@/components/crm-header"
import { FinancialOverview } from "@/components/financeiro/financial-overview"
import { FinancialTable } from "@/components/financeiro/financial-table"
import { RevenueChart } from "@/components/financeiro/revenue-chart"

export default function FinanceiroPage() {
  return (
    <>
      <CrmHeader title="Financeiro" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Controle Financeiro
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie honorarios, pagamentos e receitas do escritorio.
          </p>
        </div>

        <FinancialOverview />
        <RevenueChart />
        <FinancialTable />
      </div>
    </>
  )
}
