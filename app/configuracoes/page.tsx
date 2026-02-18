"use client"

import { useState, useEffect } from "react"
import { CrmHeader } from "@/components/crm-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  getApiConfig,
  setApiConfig,
  clearApiConfig,
  testConnection,
  isApiConfigured,
} from "@/lib/api"
import { CheckCircle2, XCircle, Loader2, Wifi, WifiOff } from "lucide-react"

export default function ConfiguracoesPage() {
  const [baseUrl, setBaseUrl] = useState("")
  const [token, setToken] = useState("")
  const [testing, setTesting] = useState(false)
  const [connected, setConnected] = useState<boolean | null>(null)
  const [statusMessage, setStatusMessage] = useState("Nenhuma API configurada")

  useEffect(() => {
    const cfg = getApiConfig()
    if (cfg) {
      setBaseUrl(cfg.baseUrl)
      setToken(cfg.token)
      setConnected(null)
      setStatusMessage("Configuracao salva - teste a conexao")
    }
  }, [])

  async function handleSave() {
    if (!baseUrl.trim()) {
      toast.error("Informe a URL base da API")
      return
    }
    setApiConfig({ baseUrl: baseUrl.trim(), token: token.trim() })
    toast.success("Configuracao salva com sucesso!")
    setConnected(null)
    setStatusMessage("Configuracao salva - teste a conexao")
  }

  async function handleTest() {
    if (!baseUrl.trim()) {
      toast.error("Salve a configuracao antes de testar")
      return
    }
    setTesting(true)
    setApiConfig({ baseUrl: baseUrl.trim(), token: token.trim() })
    const result = await testConnection()
    setTesting(false)
    setConnected(result.ok)
    setStatusMessage(result.message)
    if (result.ok) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  function handleDisconnect() {
    clearApiConfig()
    setBaseUrl("")
    setToken("")
    setConnected(null)
    setStatusMessage("Nenhuma API configurada")
    toast.info("API desconectada. Usando dados de demonstracao.")
  }

  return (
    <>
      <CrmHeader title="Configuracoes" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Configuracoes
          </h2>
          <p className="text-sm text-muted-foreground">
            Gerencie as configuracoes do escritorio e integracao com a API.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Office Info */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">Dados do Escritorio</CardTitle>
              <CardDescription className="text-xs">
                Informacoes gerais do escritorio de advocacia.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firm-name" className="text-xs">Nome do Escritorio</Label>
                <Input id="firm-name" defaultValue="Mendes & Associados Advocacia" className="text-xs" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firm-cnpj" className="text-xs">CNPJ</Label>
                <Input id="firm-cnpj" defaultValue="12.345.678/0001-90" className="text-xs" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="firm-email" className="text-xs">Email</Label>
                  <Input id="firm-email" defaultValue="contato@mendes.adv.br" className="text-xs" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="firm-phone" className="text-xs">Telefone</Label>
                  <Input id="firm-phone" defaultValue="(11) 3333-4567" className="text-xs" />
                </div>
              </div>
              <Button size="sm" className="self-end">Salvar</Button>
            </CardContent>
          </Card>

          {/* API Connection */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-sm">Conexao com API</CardTitle>
                  <CardDescription className="text-xs">
                    Configure a URL base e credenciais da sua API FastAPI.
                  </CardDescription>
                </div>
                {isApiConfigured() && (
                  <Badge variant="outline" className="text-[10px]">
                    Configurada
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="api-url" className="text-xs">URL Base da API</Label>
                <Input
                  id="api-url"
                  placeholder="https://api.seudominio.com/v1"
                  className="text-xs font-mono"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
                <span className="text-[10px] text-muted-foreground">
                  Exemplo: https://api.seudominio.com/v1
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="api-token" className="text-xs">Token de Acesso (opcional)</Label>
                <Input
                  id="api-token"
                  type="password"
                  placeholder="Bearer token..."
                  className="text-xs font-mono"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>

              <Separator />

              {/* Connection Status */}
              <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  {connected === true && (
                    <CheckCircle2 className="size-5 text-success" />
                  )}
                  {connected === false && (
                    <XCircle className="size-5 text-destructive" />
                  )}
                  {connected === null && !testing && (
                    <WifiOff className="size-5 text-muted-foreground" />
                  )}
                  {testing && (
                    <Loader2 className="size-5 animate-spin text-primary" />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium text-foreground">
                      Status da Conexao
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {testing ? "Testando conexao..." : statusMessage}
                    </span>
                  </div>
                </div>
                {connected === true && (
                  <div className="flex size-2.5 rounded-full bg-success" />
                )}
                {connected === false && (
                  <div className="flex size-2.5 rounded-full bg-destructive" />
                )}
                {connected === null && (
                  <div className="flex size-2.5 rounded-full bg-warning" />
                )}
              </div>

              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Enquanto nenhuma API estiver configurada, o sistema utilizara dados de demonstracao.
                Ao conectar sua API FastAPI, todos os dados serao buscados automaticamente do seu backend.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 justify-end">
                {isApiConfigured() && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDisconnect}
                    className="text-destructive"
                  >
                    <WifiOff className="mr-1.5 size-3.5" />
                    Desconectar
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTest}
                  disabled={testing || !baseUrl.trim()}
                >
                  {testing ? (
                    <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                  ) : (
                    <Wifi className="mr-1.5 size-3.5" />
                  )}
                  Testar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Endpoints Info */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">Endpoints Esperados</CardTitle>
            <CardDescription className="text-xs">
              Sua API FastAPI deve implementar os seguintes endpoints para integracao completa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { method: "GET", path: "/clients", desc: "Listar clientes" },
                { method: "POST", path: "/clients", desc: "Criar cliente" },
                { method: "PUT", path: "/clients/:id", desc: "Atualizar cliente" },
                { method: "DELETE", path: "/clients/:id", desc: "Remover cliente" },
                { method: "GET", path: "/cases", desc: "Listar processos" },
                { method: "POST", path: "/cases", desc: "Criar processo" },
                { method: "PUT", path: "/cases/:id", desc: "Atualizar processo" },
                { method: "DELETE", path: "/cases/:id", desc: "Remover processo" },
                { method: "GET", path: "/tasks", desc: "Listar tarefas" },
                { method: "POST", path: "/tasks", desc: "Criar tarefa" },
                { method: "PUT", path: "/tasks/:id", desc: "Atualizar tarefa" },
                { method: "GET", path: "/hearings", desc: "Listar audiencias" },
                { method: "GET", path: "/financial-records", desc: "Listar financeiro" },
                { method: "GET", path: "/users", desc: "Listar usuarios" },
                { method: "GET", path: "/health", desc: "Teste de conexao" },
              ].map((ep) => (
                <div
                  key={`${ep.method}-${ep.path}`}
                  className="flex items-center gap-2 rounded-md border border-border/50 bg-secondary/30 px-3 py-2"
                >
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-mono font-bold ${
                      ep.method === "GET"
                        ? "border-chart-2 text-chart-2"
                        : ep.method === "POST"
                          ? "border-chart-1 text-chart-1"
                          : ep.method === "PUT"
                            ? "border-warning text-warning"
                            : "border-destructive text-destructive"
                    }`}
                  >
                    {ep.method}
                  </Badge>
                  <span className="text-[11px] font-mono text-foreground">
                    {ep.path}
                  </span>
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {ep.desc}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
