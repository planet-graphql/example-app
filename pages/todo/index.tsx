import React from 'react'
import * as Primer from '@primer/react'
import { useMutation, useQuery } from '@apollo/client'
import {
  QueryTodosResponse,
  QueryTodos,
  MutationDeleteManyTodoResponse,
  MutationDeleteManyTodo,
  MutationUpdateManyTodo,
  MutationUpdateManyTodoResponse,
  MutationCreateTodo,
  MutationCreateTodoResponse,
} from '../../lib/queries'
import PageFrame from '../components/layouts/pageFrame'
import CreateTodoDialog from '../components/organisms/createTodoDialog'
import TodoTable from '../components/organisms/todoTable'

function Todo() {
  const { data, loading, refetch } = useQuery<QueryTodosResponse>(QueryTodos, {
    fetchPolicy: 'network-only',
  })

  const [createTodo] = useMutation<MutationCreateTodoResponse>(MutationCreateTodo)

  const [updateManyTodo] =
    useMutation<MutationUpdateManyTodoResponse>(MutationUpdateManyTodo)
  const [deleteManyTodo] =
    useMutation<MutationDeleteManyTodoResponse>(MutationDeleteManyTodo)

  if (loading) {
    return <></>
  }

  return (
    <PageFrame>
      <Primer.Box display="flex" justifyContent="space-between">
        <Primer.Box></Primer.Box>
        <CreateTodoDialog
          onCreate={async (value) => {
            await createTodo({ variables: { input: value } })
            await refetch()
          }}
        />
      </Primer.Box>
      <Primer.Box marginY={2}></Primer.Box>
      <TodoTable
        todos={data?.todos ?? []}
        onFilterChange={async (value) => {
          await refetch(value)
        }}
        onEditSelect={async (ids, values) => {
          await updateManyTodo({
            variables: { id: ids.map((x) => Number(x)), input: values },
          })
          await refetch()
        }}
        onDelete={async (value) => {
          await deleteManyTodo({ variables: { id: Number(value) } })
          await refetch()
        }}
      ></TodoTable>
    </PageFrame>
  )
}

export default Todo
