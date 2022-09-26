import { useMutation, useQuery } from '@apollo/client'
import {
  QueryTodosResponse,
  QueryTodos,
  MutationDeleteManyTodoResponse,
  MutationDeleteManyTodo,
  MutationUpdateManyTodo,
  MutationUpdateManyTodoResponse,
} from '../../lib/queries'
import PageFrame from '../components/layouts/pageFrame'
import TodoTable from '../components/organisms/todoTable'

function Todo() {
  const { data, loading, refetch } = useQuery<QueryTodosResponse>(QueryTodos, {
    fetchPolicy: 'network-only',
  })

  const [updateManyTodo] =
    useMutation<MutationUpdateManyTodoResponse>(MutationUpdateManyTodo)
  const [deleteManyTodo] =
    useMutation<MutationDeleteManyTodoResponse>(MutationDeleteManyTodo)

  if (loading) {
    return <></>
  }

  return (
    <PageFrame>
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
