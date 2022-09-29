import React from 'react'
import * as Primer from '@primer/react'
import DefaultModeHeader from './todoTableHeaderDefaultMode'
import TodoTableItem from './todoTableItem'
import { useRouter } from 'next/router'
import { TodoStatus, TypeOfTodoFilter } from '../../../lib/tokens'
import EditModeHeader from './todoTableHeaderEditMode'

type Todo = {
  id: string
  title: string
  content: string
  deadline: Date
  counterparty: string
  todaysAction: boolean
  status: TodoStatus
}

type Props = {
  todos: Todo[]
  onFilterChange: (filter: TypeOfTodoFilter) => void
  onEditSelect: (
    ids: string[],
    value: {
      deadline?: Date
      todaysAction?: boolean
      status?: TodoStatus
    },
  ) => void
  onDelete: (ids: string[]) => void
}

function TodoTable(props: Props) {
  const router = useRouter()
  const [editMode, setEditMode] = React.useState(false)
  const [checkedIds, setCheckedIds] = React.useState<string[]>([])

  React.useEffect(() => {
    setEditMode(checkedIds.length > 0)
  }, [checkedIds])

  return (
    <Primer.Box>
      {editMode ? (
        <EditModeHeader
          counter={checkedIds.length}
          onSelect={(value) => {
            props.onEditSelect(checkedIds, value)
            setCheckedIds([])
          }}
          onDelete={() => {
            props.onDelete(checkedIds)
            setCheckedIds([])
          }}
        />
      ) : (
        <DefaultModeHeader
          counter={props.todos.length}
          onFilterChange={props.onFilterChange}
        />
      )}
      {props.todos.map((x) => (
        <TodoTableItem
          key={x.id}
          formValue={x}
          onCheck={(id, isChecked) => {
            if (!isChecked) setCheckedIds(checkedIds.filter((x) => x !== id))
            if (isChecked && checkedIds.find((x) => x === id) === undefined)
              setCheckedIds([...checkedIds, id])
          }}
          onClick={(id) => router.push(`${router.asPath}/${id}`)}
          isChecked={checkedIds.includes(x.id)}
        ></TodoTableItem>
      ))}
    </Primer.Box>
  )
}

export default TodoTable
