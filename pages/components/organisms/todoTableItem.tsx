import React from 'react'
import * as Primer from '@primer/react'
import { format } from 'date-fns'
import { TodoStatus } from '../../../lib/tokens'

type Props = {
  formValue: {
    id: number
    title: string
    content: string
    deadline: Date
    counterparty: string
    todaysAction: boolean
    status: TodoStatus
  }
  onCheck: (id: number, isChecked: boolean) => void
  onClick: (id: number) => void
}

function TodoTableItem(props: Props) {
  const chipColor =
    props.formValue.status === 'New'
      ? '#cf222e'
      : props.formValue.status === 'InProgress'
      ? '#2da44e'
      : props.formValue.status === 'Done'
      ? '#8250df'
      : '#57606a'

  return (
    <Primer.Box
      display="flex"
      alignItems="center"
      borderColor="border.default"
      borderWidth={1}
      borderStyle="solid"
      borderTopStyle="none"
      p={2}
    >
      <Primer.Box flex="0 0 auto">
        <Primer.Checkbox
          value={props.formValue.id.toString()}
          onChange={(e) => props.onCheck(props.formValue.id, e.target.checked)}
        />
      </Primer.Box>
      <Primer.Box
        display="flex"
        justifyContent="center"
        width={90}
        px={2}
        flex="0 0 auto"
      >
        <Primer.Label
          size="large"
          sx={{
            borderColor: chipColor,
            color: chipColor,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {props.formValue.status}
        </Primer.Label>
      </Primer.Box>
      <Primer.Box
        sx={{
          minWidth: 1,
        }}
        flex="1 1 0"
      >
        <Primer.Box display="flex">
          <Primer.Box
            color="#0969da"
            sx={{
              maxWidth: '50%',
              boxSizing: 'border-box',
            }}
            pr={2}
            flex="0 1 0"
          >
            <Primer.Text
              as="p"
              m={0}
              fontSize={16}
              onClick={() => props.onClick(props.formValue.id)}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              }}
            >
              {props.formValue.title}
            </Primer.Text>
          </Primer.Box>
          <Primer.Box
            display="flex"
            alignItems="flex-end"
            sx={{
              maxWidth: '50%',
              boxSizing: 'border-box',
            }}
            flex="1 1 0"
          >
            <Primer.Text
              as="p"
              m={0}
              fontSize={14}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {props.formValue.content}
            </Primer.Text>
          </Primer.Box>
        </Primer.Box>
        <Primer.Box display="flex" color="#57606a" fontSize={12}>
          <Primer.Box pr={2} flex="0 0 1">
            {`#${props.formValue.id}`}
          </Primer.Box>
          <Primer.Box
            sx={{ minWidth: 1, boxSizing: 'border-box' }}
            pr={2}
            flex="0 1 fit-content"
          >
            <Primer.Text
              as="div"
              m={0}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {`Deadline: ${
                props.formValue.deadline !== undefined
                  ? format(props.formValue.deadline, 'dd/MM/yyyy')
                  : '--'
              }`}
            </Primer.Text>
          </Primer.Box>
          <Primer.Box pr={2} flex="0 0 1">
            /
          </Primer.Box>
          <Primer.Box sx={{ minWidth: 1, boxSizing: 'border-box' }} flex="1 1 0">
            <Primer.Text
              as="div"
              m={0}
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {`Counterparty: ${props.formValue.counterparty}`}
            </Primer.Text>
          </Primer.Box>
        </Primer.Box>
      </Primer.Box>
      <Primer.Box
        width={130}
        sx={{ boxSizing: 'border-box' }}
        fontSize={14}
        flex="0 0 auto"
      >
        {props.formValue.todaysAction ? `Today's Action` : ''}
      </Primer.Box>
    </Primer.Box>
  )
}

export default TodoTableItem
