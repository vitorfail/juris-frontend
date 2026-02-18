import { CrmHeader } from "@/components/crm-header"
import { ClientsTable } from "@/components/clientes/clients-table"

export default function ClientesPage() {
  return (
    <>
      <CrmHeader title="Clientes" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Gestao de Clientes
          </h2>
          <p className="text-sm text-muted-foreground">
            Cadastre e gerencie seus clientes pessoa fisica e juridica.
          </p>
        </div>
        <ClientsTable />
      </div>
    </>
  )
}
