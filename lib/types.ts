// Types derived from FastAPI Pydantic schemas

export interface LawFirm {
  id: string
  name: string
  cnpj?: string
  email?: string
  phone?: string
  created_at: string
  updated_at: string
}

export type UserRole = "admin" | "lawyer" | "assistant"

export interface User {
  id: string
  law_firm_id: string
  name: string
  email: string
  role: UserRole
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ClientType = "pf" | "pj"

export interface Client {
  id: string
  law_firm_id: string
  type: ClientType
  name: string
  document?: string
  email?: string
  phone?: string
  address?: string
  estado?: string
  created_at: string
  updated_at: string
}

export type CaseStatus = "ativo" | "arquivado" | "suspenso" | "encerrado"

export interface Case {
  id: string
  law_firm_id: string
  client_id: string
  case_number?: string
  court?: string
  area?: string
  status?: string
  distribution_date?: string
  value?: number
  description?: string
  responsible_lawyer_id?: string
  created_at: string
  updated_at: string
}

export interface CaseParty {
  id: string
  case_id: string
  name: string
  role?: string
  document?: string
}

export interface CaseMovement {
  id: string
  case_id: string
  movement_date: string
  description?: string
  created_at: string
}

export type TaskStatus = "pending" | "done" | "late"

export interface Task {
  id: string
  law_firm_id: string
  case_id?: string
  assigned_to?: string
  title: string
  description?: string
  due_date?: string
  status: TaskStatus
  created_at: string
}

export interface Hearing {
  id: string
  case_id: string
  hearing_date: string
  type?: string
  location?: string
  notes?: string
}

export interface Document {
  id: string
  case_id: string
  file_name: string
  file_url: string
  uploaded_by?: string
  created_at: string
}

export type FinancialType = "fee" | "payment"

export interface FinancialRecord {
  id: string
  case_id: string
  type: FinancialType
  description?: string
  amount: number
  due_date?: string
  paid_at?: string
}

export interface Note {
  id: string
  case_id: string
  user_id: string
  content: string
  created_at: string
}

// Extended types with relations
export interface ClientWithCases extends Client {
  cases: Case[]
}

export interface CaseWithRelations extends Case {
  client?: Client
  responsible_lawyer?: User
  case_parties: CaseParty[]
  case_movements: CaseMovement[]
  tasks: Task[]
  hearings: Hearing[]
  documents: Document[]
  financial_records: FinancialRecord[]
  notes: Note[]
}
