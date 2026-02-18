import type {
  Client,
  Case,
  Task,
  Hearing,
  FinancialRecord,
  User,
} from "./types"
import {
  mockClients,
  mockCases,
  mockTasks,
  mockHearings,
  mockFinancialRecords,
  mockUsers,
} from "./mock-data"

// ---------------------------------------------------------------------------
// API Configuration
// ---------------------------------------------------------------------------

const CONFIG_KEY = "lexcrm_api_config"

export interface ApiConfig {
  baseUrl: string
  token: string
}

export function getApiConfig(): ApiConfig | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ApiConfig
  } catch {
    return null
  }
}

export function setApiConfig(config: ApiConfig) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export function clearApiConfig() {
  localStorage.removeItem(CONFIG_KEY)
}

export function isApiConfigured(): boolean {
  const cfg = getApiConfig()
  return !!cfg?.baseUrl
}

// ---------------------------------------------------------------------------
// Generic fetch helper
// ---------------------------------------------------------------------------

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const cfg = getApiConfig()
  if (!cfg?.baseUrl) {
    throw new Error("API nao configurada")
  }

  const url = `${cfg.baseUrl.replace(/\/+$/, "")}${path}`
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {}),
    ...(options?.headers ?? {}),
  }

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Erro ${res.status}: ${body || res.statusText}`)
  }

  return res.json() as Promise<T>
}

// ---------------------------------------------------------------------------
// Helper: if the API is configured, hit it; otherwise fall back to mock data
// ---------------------------------------------------------------------------

async function withFallback<T>(
  fetchFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!isApiConfigured()) return fallback
  try {
    return await fetchFn()
  } catch {
    // If the API call fails we still return mock data so the UI doesn't break.
    // In production you might want to throw or show a toast instead.
    return fallback
  }
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export async function fetchClients(): Promise<Client[]> {
  return withFallback(() => apiFetch<Client[]>("/clients"), mockClients)
}

export async function fetchClient(id: string): Promise<Client | undefined> {
  return withFallback(
    () => apiFetch<Client>(`/clients/${id}`),
    mockClients.find((c) => c.id === id)
  )
}

export async function createClient(
  data: Omit<Client, "id" | "created_at" | "updated_at">
): Promise<Client> {
  return withFallback(
    () =>
      apiFetch<Client>("/clients", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Client
  )
}

export async function updateClient(
  id: string,
  data: Partial<Client>
): Promise<Client> {
  return withFallback(
    () =>
      apiFetch<Client>(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    { ...mockClients[0], ...data, id } as Client
  )
}

export async function deleteClient(id: string): Promise<void> {
  if (!isApiConfigured()) return
  await apiFetch<void>(`/clients/${id}`, { method: "DELETE" })
}

// ---------------------------------------------------------------------------
// Cases
// ---------------------------------------------------------------------------

export async function fetchCases(): Promise<Case[]> {
  return withFallback(() => apiFetch<Case[]>("/cases"), mockCases)
}

export async function fetchCase(id: string): Promise<Case | undefined> {
  return withFallback(
    () => apiFetch<Case>(`/cases/${id}`),
    mockCases.find((c) => c.id === id)
  )
}

export async function createCase(
  data: Omit<Case, "id" | "created_at" | "updated_at">
): Promise<Case> {
  return withFallback(
    () =>
      apiFetch<Case>("/cases", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Case
  )
}

export async function updateCase(
  id: string,
  data: Partial<Case>
): Promise<Case> {
  return withFallback(
    () =>
      apiFetch<Case>(`/cases/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    { ...mockCases[0], ...data, id } as Case
  )
}

export async function deleteCase(id: string): Promise<void> {
  if (!isApiConfigured()) return
  await apiFetch<void>(`/cases/${id}`, { method: "DELETE" })
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

export async function fetchTasks(): Promise<Task[]> {
  return withFallback(() => apiFetch<Task[]>("/tasks"), mockTasks)
}

export async function createTask(
  data: Omit<Task, "id" | "created_at">
): Promise<Task> {
  return withFallback(
    () =>
      apiFetch<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() } as Task
  )
}

export async function updateTask(
  id: string,
  data: Partial<Task>
): Promise<Task> {
  return withFallback(
    () =>
      apiFetch<Task>(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    { ...mockTasks[0], ...data, id } as Task
  )
}

export async function deleteTask(id: string): Promise<void> {
  if (!isApiConfigured()) return
  await apiFetch<void>(`/tasks/${id}`, { method: "DELETE" })
}

// ---------------------------------------------------------------------------
// Hearings
// ---------------------------------------------------------------------------

export async function fetchHearings(): Promise<Hearing[]> {
  return withFallback(() => apiFetch<Hearing[]>("/hearings"), mockHearings)
}

export async function createHearing(
  data: Omit<Hearing, "id">
): Promise<Hearing> {
  return withFallback(
    () =>
      apiFetch<Hearing>("/hearings", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    { ...data, id: crypto.randomUUID() } as Hearing
  )
}

// ---------------------------------------------------------------------------
// Financial Records
// ---------------------------------------------------------------------------

export async function fetchFinancialRecords(): Promise<FinancialRecord[]> {
  return withFallback(
    () => apiFetch<FinancialRecord[]>("/financial-records"),
    mockFinancialRecords
  )
}

export async function createFinancialRecord(
  data: Omit<FinancialRecord, "id">
): Promise<FinancialRecord> {
  return withFallback(
    () =>
      apiFetch<FinancialRecord>("/financial-records", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    { ...data, id: crypto.randomUUID() } as FinancialRecord
  )
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export async function fetchUsers(): Promise<User[]> {
  return withFallback(() => apiFetch<User[]>("/users"), mockUsers)
}

// ---------------------------------------------------------------------------
// Connection test
// ---------------------------------------------------------------------------

export async function testConnection(): Promise<{
  ok: boolean
  message: string
}> {
  const cfg = getApiConfig()
  if (!cfg?.baseUrl) {
    return { ok: false, message: "URL base nao configurada" }
  }
  try {
    // Try a simple GET to the root or a /health endpoint
    const url = `${cfg.baseUrl.replace(/\/+$/, "")}/health`
    const res = await fetch(url, {
      headers: cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {},
    })
    if (res.ok) {
      return { ok: true, message: "Conexao estabelecida com sucesso!" }
    }
    return { ok: false, message: `Erro ${res.status}: ${res.statusText}` }
  } catch (err) {
    return {
      ok: false,
      message: `Falha na conexao: ${err instanceof Error ? err.message : "Erro desconhecido"}`,
    }
  }
}
