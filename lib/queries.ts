import { gql } from '@apollo/client'
import { TodoStatus } from '@prisma/client'

export type QueryTodoResponse = {
  todo: {
    id: number
    title: string
    content: string
    note: string
    counterParty: string
    deadline: Date
    todaysAction: boolean
    status: TodoStatus
  }
}

export const QueryTodo = gql`
  query ($id: Int) {
    todo(where: { id: $id }) {
      id
      title
      content
      note
      counterParty
      deadline
      todaysAction
      status
    }
  }
`
