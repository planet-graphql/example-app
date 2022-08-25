export const todoStatus = ['New', 'InProgress', 'Done', 'Pending'] as const
export type TodoStatus = typeof todoStatus[number]

export type FormValue = {
  title: string
  content: string
  note: string
  counterParty: string
  deadline: Date
  todaysAction: boolean
  status: TodoStatus
}
