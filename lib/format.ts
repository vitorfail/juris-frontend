const MONTHS_SHORT = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
]

const MONTHS_LONG = [
  "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
]

const WEEKDAYS_SHORT = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"]

function parseDate(dateStr: string): Date {
  return new Date(dateStr + (dateStr.includes("T") ? "" : "T00:00:00"))
}

export function formatDateBR(dateStr: string): string {
  const d = parseDate(dateStr)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatTimeBR(dateStr: string): string {
  const d = parseDate(dateStr)
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${hours}:${minutes}`
}

export function formatMonthShort(dateStr: string): string {
  const d = parseDate(dateStr)
  return MONTHS_SHORT[d.getMonth()]
}

export function formatMonthLong(dateStr: string): string {
  const d = parseDate(dateStr)
  return `${MONTHS_LONG[d.getMonth()]} de ${d.getFullYear()}`
}

export function formatWeekdayShort(dateStr: string): string {
  const d = parseDate(dateStr)
  return WEEKDAYS_SHORT[d.getDay()]
}

export function formatDay(dateStr: string): number {
  return parseDate(dateStr).getDate()
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
}
