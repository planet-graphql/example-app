import { useMutation, useQuery } from '@apollo/client'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import {
  QueryTodoResponse,
  QueryTodo,
  MutationUpdateTodoResponse,
  MutationUpdateTodo,
  MutationDeleteTodoResponse,
  MutationDeleteTodo,
} from '../../lib/queries'
import PageFrame from '../../components/layouts/pageFrame'
import EditTodoContentForm from '../../components/organisms/editTodoContentForm'

function Edit() {
  const router = useRouter()
  const id = Number(router.query.id)

  const { data, loading } = useQuery<QueryTodoResponse>(QueryTodo, {
    variables: { id },
    skip: !router.isReady,
  })

  const [updateTodo] = useMutation<MutationUpdateTodoResponse>(MutationUpdateTodo)
  const [deleteTodo] = useMutation<MutationDeleteTodoResponse>(MutationDeleteTodo)

  if (loading || data === undefined || !router.isReady) return <></>

  return (
    <PageFrame>
      <EditTodoContentForm
        formValue={_.pick(data?.todo, [
          'title',
          'content',
          'note',
          'counterparty',
          'deadline',
          'todaysAction',
          'status',
        ])}
        onUpdate={async (value) => {
          await updateTodo({ variables: { id, input: value } })
          router.push(`/${id}`)
        }}
        onCancel={() => {
          router.push(`/${id}`)
        }}
        onDelete={async () => {
          await deleteTodo({ variables: { id } })
          router.push(`/`)
        }}
      ></EditTodoContentForm>
    </PageFrame>
  )
}

export default Edit
