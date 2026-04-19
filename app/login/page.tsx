"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scale, ShieldCheck, Mail, Lock, Loader2 } from "lucide-react"
import { login } from "@/lib/api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Scale className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            JurisCRM
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gestão Jurídica Inteligente e Conectada
          </p>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none dark:bg-slate-900">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="advogado@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link 
                    href="#" 
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  "Entrar no Sistema"
                )}
              </Button>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Acesso Seguro SSL</span>
              </div>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Não tem uma conta?{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Solicite acesso à sua firma
          </Link>
        </p>
      </div>
    </div>
  )
}
