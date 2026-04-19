import useSWR from "swr"
import {
  fetchClients,
  fetchCases,
  fetchTasks,
  fetchHearings,
  fetchFinancialRecords,
  fetchUsers,
  fetchClientsSummary,
  fetchCasesSummary,
  fetchTasksSummary,
} from "./api"

export function useClients(page = 1, size = 20, search?: string) {
  return useSWR(
    ["clients", page, size, search],
    () => fetchClients(page, size, search),
    {
      revalidateOnFocus: false,
    }
  )
}

export function useClientsSummary() {
  return useSWR("clients-summary", fetchClientsSummary, {
    revalidateOnFocus: false,
  })
}

export function useCases() {
  return useSWR("cases", fetchCases, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useCasesSummary() {
  return useSWR("cases-summary", fetchCasesSummary, {
    revalidateOnFocus: false,
  })
}

export function useTasks() {
  return useSWR("tasks", fetchTasks, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useTasksSummary() {
  return useSWR("tasks-summary", fetchTasksSummary, {
    revalidateOnFocus: false,
  })
}

export function useHearings() {
  return useSWR("hearings", fetchHearings, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useFinancialRecords() {
  return useSWR("financial-records", fetchFinancialRecords, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useUsers() {
  return useSWR("users", fetchUsers, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}
