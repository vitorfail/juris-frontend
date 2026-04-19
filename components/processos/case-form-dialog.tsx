"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useClients, useUsers } from "@/lib/hooks"

interface CaseFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CaseFormDialog({ open, onOpenChange }: CaseFormDialogProps) {
  const { data: clients } = useClients()
  const { data: users } = useUsers()
  
  const lawyers = (users || []).filter((u) => u.role === "lawyer" || u.role === "admin")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Novo Processo</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Cadastre um novo processo judicial.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onOpenChange(false) }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="client_id" className="text-xs">Cliente</Label>
              <Select>
                <SelectTrigger id="client_id" className="text-xs">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {(clients || []).map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="case_number" className="text-xs">Numero do Processo</Label>
              <Input id="case_number" placeholder="0000000-00.0000.0.00.0000" className="text-xs font-mono" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="area" className="text-xs">Area</Label>
              <Select>
                <SelectTrigger id="area" className="text-xs">
                  <SelectValue placeholder="Area juridica" />
                </SelectTrigger>
                <SelectContent>
                  {["Civel", "Trabalhista", "Empresarial", "Familia", "Criminal", "Tributario", "Consumidor"].map(
                    (area) => (
                      <SelectItem key={area} value={area} className="text-xs">
                        {area}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="responsible" className="text-xs">Advogado Responsavel</Label>
              <Select>
                <SelectTrigger id="responsible" className="text-xs">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {lawyers.map((l) => (
                    <SelectItem key={l.id} value={l.id} className="text-xs">
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="court" className="text-xs">Vara / Tribunal</Label>
              <Input id="court" placeholder="Ex: 2a Vara Civel" className="text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="value" className="text-xs">Valor da Causa (R$)</Label>
              <Input id="value" type="number" step="0.01" placeholder="0,00" className="text-xs" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description" className="text-xs">Descricao</Label>
            <Textarea id="description" placeholder="Descricao do processo" className="text-xs min-h-16 resize-none" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              Salvar Processo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
