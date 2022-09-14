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

export type MutationUpdateTodoResponse = {
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

export const MutationUpdateTodo = gql`
  mutation ($id: Int!, $input: TodoUpdateInput!) {
    updateTodo(id: $id, input: $input) {
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

export type MutationDeleteTodoResponse = {
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

export const MutationDeleteTodo = gql`
  mutation ($id: Int!) {
    deleteTodo(id: $id) {
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
