import React from 'react'
import PageFrame from '../../components/layouts/pageFrame'
import DetailTodoContent from '../../components/organisms/detailTodoContent'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { QueryTodoResponse, QueryTodo } from '../../utils/queries'

function Detail() {
  const router = useRouter()
  const { id } = router.query

  const { data, loading } = useQuery<QueryTodoResponse>(QueryTodo, {
    variables: { id: Number(id) },
  })

  if (loading || data === undefined) {
    return <></>
  }

  return (
    <PageFrame>
      <DetailTodoContent
        values={data.todo}
        onEdit={() => {
          router.push(`${router.asPath}/edit`)
        }}
        onBack={() => {
          router.push('/')
        }}
      ></DetailTodoContent>
    </PageFrame>
  )
}

export default Detail
