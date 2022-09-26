export const todoStatus = ['New', 'InProgress', 'Done', 'Pending'] as const
export type TodoStatus = typeof todoStatus[number]

export type FormValue = {
  title: string
  content: string
  note: string
  counterparty: string
  deadline: Date
  todaysAction: boolean
  status: TodoStatus
}

export type TypeOfTodoFilter = {
  todaysAction?: boolean | undefined
  counterparty?: {
    contains: string
  }
  deadline?:
    | {
        gte: Date
        lte: Date
      }
    | undefined
  status?: {
    in: string[]
  }
}
