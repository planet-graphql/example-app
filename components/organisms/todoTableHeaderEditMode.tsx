import React from 'react'
import * as Primer from '@primer/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TodoStatus } from '../utils'

type ActionListProps = {
  title: string
  actions: {
    name: string
    onSelect: () => void
  }[]
}

function ActionList(props: ActionListProps) {
  return (
    <Primer.ActionMenu>
      <Primer.ActionMenu.Button
        variant="invisible"
        sx={{ color: 'btn.text', fontWeight: 'normal' }}
      >
        {props.title}
      </Primer.ActionMenu.Button>
      <Primer.ActionMenu.Overlay>
        <Primer.ActionList>
          {props.actions.map((x, i) => (
            <Primer.ActionList.Item key={i} onSelect={x.onSelect}>
              {x.name}
            </Primer.ActionList.Item>
          ))}
        </Primer.ActionList>
      </Primer.ActionMenu.Overlay>
    </Primer.ActionMenu>
  )
}

type EditModeHeaderProps = {
  counter: number
  onSelect: (value: {
    deadline?: Date
    todaysAction?: boolean
    status?: TodoStatus
  }) => void
  onDelete: () => void
}

function EditModeHeader(props: EditModeHeaderProps) {
  return (
    <Primer.Header
      sx={{
        paddingY: 2,
        backgroundColor: '#f6f8fa',
        color: '#000000',
        borderStyle: 'solid',
        borderRadius: '10px 10px 0 0',
        borderColor: '#d8dee4',
      }}
    >
      <Primer.Header.Item full>{props.counter} selected</Primer.Header.Item>
      <Primer.Header.Item>
        <ActionList
          title="Status"
          actions={[
            { name: 'New', onSelect: () => props.onSelect({ status: 'New' }) },
            {
              name: 'InProgress',
              onSelect: () => props.onSelect({ status: 'InProgress' }),
            },
            { name: 'Done', onSelect: () => props.onSelect({ status: 'Done' }) },
            { name: 'Pending', onSelect: () => props.onSelect({ status: 'Pending' }) },
          ]}
        />
      </Primer.Header.Item>
      <Primer.Header.Item>
        <Primer.ActionMenu>
          <DatePicker
            onChange={(value) => {
              if (value !== null) return props.onSelect({ deadline: value })
            }}
            customInput={
              <Primer.ActionMenu.Button
                variant="invisible"
                sx={{ color: 'btn.text', fontWeight: 'normal' }}
              >
                Deadline
              </Primer.ActionMenu.Button>
            }
          ></DatePicker>
        </Primer.ActionMenu>
      </Primer.Header.Item>
      <Primer.Header.Item>
        <ActionList
          title="Today's Action"
          actions={[
            { name: 'On', onSelect: () => props.onSelect({ todaysAction: true }) },
            { name: 'Off', onSelect: () => props.onSelect({ todaysAction: false }) },
          ]}
        />
      </Primer.Header.Item>
      <Primer.Header.Item onClick={() => props.onDelete()}>
        <Primer.Button variant="invisible" sx={{ color: 'btn.danger.text' }}>
          Delete
        </Primer.Button>
      </Primer.Header.Item>
    </Primer.Header>
  )
}

export default EditModeHeader
