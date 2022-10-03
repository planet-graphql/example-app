import { gql } from '@apollo/client'
import { TodoStatus } from '@prisma/client'

export type QueryTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
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
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type QueryTodosResponse = {
  todos: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
    deadline: Date
    todaysAction: boolean
    status: TodoStatus
  }[]
}

export const QueryTodos = gql`
  query (
    $status: EnumTodoStatusFilter
    $deadline: DateTimeFilter
    $counterparty: StringFilter
    $todaysAction: Boolean
  ) {
    todos(
      where: {
        status: $status
        deadline: $deadline
        counterparty: $counterparty
        todaysAction: $todaysAction
      }
    ) {
      id
      title
      content
      note
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type MutationCreateTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
    deadline: Date
    todaysAction: boolean
    status: TodoStatus
  }
}

export const MutationCreateTodo = gql`
  mutation ($input: TodoCreateInput!) {
    createTodo(input: $input) {
      id
      title
      content
      note
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type MutationUpdateTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
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
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type MutationDeleteTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
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
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type MutationUpdateManyTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
    deadline: Date
    todaysAction: boolean
    status: TodoStatus
  }[]
}

export const MutationUpdateManyTodo = gql`
  mutation ($id: [Int!]!, $input: TodoUpdateManyMutationInput!) {
    updateManyTodo(id: $id, input: $input) {
      id
      title
      content
      note
      counterparty
      deadline
      todaysAction
      status
    }
  }
`

export type MutationDeleteManyTodoResponse = {
  todo: {
    id: string
    title: string
    content: string
    note: string
    counterparty: string
    deadline: Date
    todaysAction: boolean
    status: TodoStatus
  }[]
}

export const MutationDeleteManyTodo = gql`
  mutation ($id: [Int!]!) {
    deleteManyTodo(id: $id) {
      id
      title
      content
      note
      counterparty
      deadline
      todaysAction
      status
    }
  }
`
