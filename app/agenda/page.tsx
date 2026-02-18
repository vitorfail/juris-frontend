import { CrmHeader } from "@/components/crm-header"
import { HearingsList } from "@/components/agenda/hearings-list"

export default function AgendaPage() {
  return (
    <>
      <CrmHeader title="Agenda" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Agenda de Audiencias
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe todas as audiencias e compromissos agendados.
          </p>
        </div>
        <HearingsList />
      </div>
    </>
  )
}
