import { CrmHeader } from "@/components/crm-header"
import { CasesTable } from "@/components/processos/cases-table"

export default function ProcessosPage() {
  return (
    <>
      <CrmHeader title="Processos" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Gestao de Processos
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe e gerencie todos os processos judiciais do escritorio.
          </p>
        </div>
        <CasesTable />
      </div>
    </>
  )
}
