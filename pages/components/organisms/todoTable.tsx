import React from 'react'
import * as Primer from '@primer/react'
import DefaultModeHeader from './todoTableHeaderDefaultMode'
import TodoTableItem from './todoTableItem'
import { useRouter } from 'next/router'
import { TodoStatus } from '../../../lib/tokens'

type Todo = {
  id: number
  title: string
  content: string
  deadline: Date
  counterparty: string
  todaysAction: boolean
  status: TodoStatus
}

type Props = {
  todos: Todo[]
  onStatusFilter: (values: string[]) => void
  onDeadlineFilter: (value: Date | null) => void
  onCounterpartyFilter: (values: string[]) => void
  onTodaysActionFilter: (value: boolean) => void
}

function TodoTable(props: Props) {
  const router = useRouter()

  return (
    <Primer.Box>
      <DefaultModeHeader
        counter={props.todos.length}
        counterpartyList={props.todos.map((x) => x.counterparty)}
        onDeadlineFilter={props.onDeadlineFilter}
        onStatusFilter={props.onStatusFilter}
        onCounterpartyFilter={props.onCounterpartyFilter}
        onTodaysActionFilter={props.onTodaysActionFilter}
      />
      {props.todos.map((x) => (
        <TodoTableItem
          key={x.id}
          formValue={x}
          onClick={(id) => router.push(`${router.asPath}/${id}`)}
        ></TodoTableItem>
      ))}
    </Primer.Box>
  )
}

export default TodoTable
