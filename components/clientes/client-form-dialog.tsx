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

interface ClientFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ClientFormDialog({ open, onOpenChange }: ClientFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">Novo Cliente</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Preencha os dados para cadastrar um novo cliente.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onOpenChange(false) }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="type" className="text-xs">Tipo</Label>
              <Select>
                <SelectTrigger id="type" className="text-xs">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pf" className="text-xs">Pessoa Fisica</SelectItem>
                  <SelectItem value="pj" className="text-xs">Pessoa Juridica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name" className="text-xs">Nome / Razao Social</Label>
              <Input id="name" placeholder="Nome completo" className="text-xs" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="document" className="text-xs">CPF / CNPJ</Label>
              <Input id="document" placeholder="000.000.000-00" className="text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input id="email" type="email" placeholder="email@exemplo.com" className="text-xs" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone" className="text-xs">Telefone</Label>
              <Input id="phone" placeholder="(00) 00000-0000" className="text-xs" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="estado" className="text-xs">Estado</Label>
              <Select>
                <SelectTrigger id="estado" className="text-xs">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {["SP", "RJ", "MG", "RS", "PR", "SC", "BA", "PE", "CE", "DF"].map((uf) => (
                    <SelectItem key={uf} value={uf} className="text-xs">{uf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address" className="text-xs">Endereco</Label>
            <Textarea id="address" placeholder="Endereco completo" className="text-xs min-h-16 resize-none" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" size="sm">
              Salvar Cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
