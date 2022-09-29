import type { GetServerSideProps, NextPage } from 'next'
import * as Primer from '@primer/react'
import React from 'react'
import supertokensNode from 'supertokens-node'
import { backendConfig } from '../config/backendConfig'
import Session from 'supertokens-node/recipe/session'
import PageFrame from '../components/layouts/pageFrame'
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
} from '../lib/queries'
import CreateTodoDialog from '../components/organisms/createTodoDialog'
import TodoTable from '../components/organisms/todoTable'

export const getServerSideProps: GetServerSideProps = async (context) => {
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err: any) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: {} }
    } else {
      throw err
    }
  }
  return {
    props: { userId: session.getUserId() },
  }
}

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
