import React from 'react'
import * as Primer from '@primer/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ItemInput } from '@primer/react/lib/deprecated/ActionList/List'
import { endOfDay } from 'date-fns'
import { TypeOfTodoFilter } from '../../lib/tokens'

type SelectPanelProps = {
  title: string
  items: ItemInput[]
  values: ItemInput[]
  onSelect: (items: ItemInput[]) => void
  onClose: () => void
}

type DefaultModeHeaderProps = {
  counter: number
  onFilterChange: (filter: TypeOfTodoFilter) => void
}

const statusFilterItems = [
  { id: 1, text: 'New' },
  { id: 2, text: 'InProgress' },
  { id: 3, text: 'Done' },
  { id: 4, text: 'Pending' },
]
const todaysActionFilterItems = [{ id: 1, text: 'On' }]

function SelectPanel(props: SelectPanelProps) {
  const [filter, setFilter] = React.useState('')
  const filteredItems = props.items.filter((item) =>
    item.text?.toLowerCase().startsWith(filter.toLowerCase()),
  )
  const [open, setOpen] = React.useState(false)

  return (
    <Primer.SelectPanel
      renderAnchor={({ children, 'aria-labelledby': ariaLabelledBy, ...anchorProps }) => (
        <Primer.ActionMenu.Button
          variant="invisible"
          aria-labelledby={` ${ariaLabelledBy}`}
          {...anchorProps}
          sx={{ color: 'btn.text', fontWeight: 'normal' }}
        >
          {props.title}
        </Primer.ActionMenu.Button>
      )}
      placeholderText="Filter Labels"
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) props.onClose()
      }}
      items={filteredItems}
      selected={props.values}
      onSelectedChange={props.onSelect}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: 'small', height: 'xsmall' }}
    />
  )
}

function DefaultModeHeader(props: DefaultModeHeaderProps) {
  const [isOpenDeadlineFilter, setIsOpenDeadlineFilter] = React.useState(false)

  const [statusFilter, setStatusFilter] = React.useState<ItemInput[]>(statusFilterItems)
  const [deadlineFilter, setDeadlineFilter] = React.useState<Date | null>(null)
  const [counterpartyFilter, setCounterpartyFilter] = React.useState<string>('')
  const [todaysActionFilter, setTodaysActionFilter] = React.useState<ItemInput[]>([])

  const queryVariables: TypeOfTodoFilter = {
    status: { in: statusFilter?.map((x) => x.text ?? '') },
    ...(deadlineFilter !== null
      ? {
          deadline: {
            gte: deadlineFilter,
            lte: endOfDay(new Date(deadlineFilter)),
          },
        }
      : {
          deadline: undefined,
        }),
    counterparty: { contains: counterpartyFilter },
    ...(todaysActionFilter.length > 0 && todaysActionFilter[0].text === 'On'
      ? {
          todaysAction: true,
        }
      : {
          todaysAction: undefined,
        }),
  }

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
      <Primer.Header.Item full>{props.counter} todos</Primer.Header.Item>
      <Primer.Box display="flex" flexWrap="wrap">
        <Primer.Header.Item>
          <SelectPanel
            title="Status"
            items={statusFilterItems}
            values={statusFilter}
            onSelect={(values) => {
              setStatusFilter(values)
            }}
            onClose={() => props.onFilterChange(queryVariables)}
          />
        </Primer.Header.Item>
        <Primer.Header.Item>
          <Primer.ActionMenu
            open={isOpenDeadlineFilter}
            onOpenChange={(isOpen) => {
              setIsOpenDeadlineFilter(isOpen)
              if (!isOpen) props.onFilterChange(queryVariables)
            }}
          >
            <Primer.ActionMenu.Button
              variant="invisible"
              sx={{ color: 'btn.text', fontWeight: 'normal' }}
            >
              Deadline
            </Primer.ActionMenu.Button>
            <Primer.ActionMenu.Overlay>
              <Primer.Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={2}
              >
                <DatePicker
                  selected={deadlineFilter}
                  inline
                  onChange={(value) => {
                    setDeadlineFilter(value)
                  }}
                ></DatePicker>
                <Primer.Box
                  onClick={() => {
                    setIsOpenDeadlineFilter(false)
                    setDeadlineFilter(null)
                    props.onFilterChange({
                      ...queryVariables,
                      deadline: undefined,
                    })
                  }}
                >
                  <Primer.Button>Clear</Primer.Button>
                </Primer.Box>
              </Primer.Box>
            </Primer.ActionMenu.Overlay>
          </Primer.ActionMenu>
        </Primer.Header.Item>
        <Primer.Header.Item>
          <Primer.ActionMenu
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                props.onFilterChange(queryVariables)
              }
            }}
          >
            <Primer.ActionMenu.Button
              variant="invisible"
              sx={{ color: 'btn.text', fontWeight: 'normal' }}
            >
              Counterparty
            </Primer.ActionMenu.Button>
            <Primer.ActionMenu.Overlay>
              <Primer.Box padding={2}>
                <Primer.TextInput
                  defaultValue={counterpartyFilter}
                  onChange={(e) => {
                    setCounterpartyFilter(e.target.value)
                  }}
                />
              </Primer.Box>
            </Primer.ActionMenu.Overlay>
          </Primer.ActionMenu>
        </Primer.Header.Item>
        <Primer.Header.Item>
          <SelectPanel
            title="Today's Action"
            items={todaysActionFilterItems}
            values={todaysActionFilter}
            onSelect={(values) => {
              setTodaysActionFilter(values)
            }}
            onClose={() => props.onFilterChange(queryVariables)}
          />
        </Primer.Header.Item>
      </Primer.Box>
    </Primer.Header>
  )
}

export default DefaultModeHeader
