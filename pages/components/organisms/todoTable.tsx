import React from 'react'
import * as Primer from '@primer/react'
import DefaultModeHeader from './todoTableHeaderDefaultMode'
import TodoTableItem from './todoTableItem'
import { useRouter } from 'next/router'
import { TodoStatus } from '../../../lib/tokens'
import EditModeHeader from './todoTableHeaderEditMode'

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
  onEditSelect: (
    ids: number[],
    value: {
      deadline?: Date
      todaysAction?: boolean
      status?: TodoStatus
    },
  ) => void
  onDelete: (ids: number[]) => void
}

function TodoTable(props: Props) {
  const router = useRouter()
  const [editMode, setEditMode] = React.useState(false)
  const checkedIds = React.useRef<number[]>([])

  return (
    <Primer.Box>
      {editMode ? (
        <EditModeHeader
          counter={checkedIds.current.length}
          onSelect={(value) => props.onEditSelect(checkedIds.current, value)}
          onDelete={() => props.onDelete(checkedIds.current)}
        />
      ) : (
        <DefaultModeHeader
          counter={props.todos.length}
          counterpartyList={props.todos.map((x) => x.counterparty)}
          onDeadlineFilter={props.onDeadlineFilter}
          onStatusFilter={props.onStatusFilter}
          onCounterpartyFilter={props.onCounterpartyFilter}
          onTodaysActionFilter={props.onTodaysActionFilter}
        />
      )}
      {props.todos.map((x) => (
        <TodoTableItem
          key={x.id}
          formValue={x}
          onCheck={(id, isChecked) => {
            if (!isChecked)
              checkedIds.current = checkedIds.current.filter((x) => x !== id)
            if (isChecked && checkedIds.current.find((x) => x === id) === undefined)
              checkedIds.current.push(id)
            setEditMode(checkedIds.current.length > 0)
          }}
          onClick={(id) => router.push(`${router.asPath}/${id}`)}
        ></TodoTableItem>
      ))}
    </Primer.Box>
  )
}

export default TodoTable
