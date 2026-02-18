import useSWR from "swr"
import {
  fetchClients,
  fetchCases,
  fetchTasks,
  fetchHearings,
  fetchFinancialRecords,
  fetchUsers,
} from "./api"

export function useClients() {
  return useSWR("clients", fetchClients, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useCases() {
  return useSWR("cases", fetchCases, {
    fallbackData: [],
    revalidateOnFocus: false,
  })
}

export function useTasks() {
  return useSWR("tasks", fetchTasks, {
    fallbackData: [],
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
