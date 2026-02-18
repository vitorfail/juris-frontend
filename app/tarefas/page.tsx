import { CrmHeader } from "@/components/crm-header"
import { TasksBoard } from "@/components/tarefas/tasks-board"

export default function TarefasPage() {
  return (
    <>
      <CrmHeader title="Tarefas" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Gestao de Tarefas
          </h2>
          <p className="text-sm text-muted-foreground">
            Organize e acompanhe todas as tarefas do escritorio.
          </p>
        </div>
        <TasksBoard />
      </div>
    </>
  )
}
