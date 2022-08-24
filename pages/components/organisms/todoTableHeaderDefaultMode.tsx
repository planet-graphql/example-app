import React from 'react'
import * as Primer from '@primer/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ItemInput } from '@primer/react/lib/deprecated/ActionList/List'
import _ from 'lodash'

type SelectPanelProps = {
  title: string
  items: ItemInput[]
  onSelect: (items: ItemInput[]) => void
}

type DefaultModeHeaderProps = {
  counter: number
  counterpartyList: string[]
  onStatusFilter: (values: string[]) => void
  onDeadlineFilter: (value: Date | null) => void
  onCounterpartyFilter: (values: string[]) => void
  onTodaysActionFilter: (value: boolean) => void
}

function SelectPanel(props: SelectPanelProps) {
  const [selected, setSelected] = React.useState<SelectPanelProps['items']>([])
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
      onOpenChange={setOpen}
      items={filteredItems}
      selected={selected}
      onSelectedChange={(selected: SelectPanelProps['items']) => {
        setSelected(selected)
        props.onSelect(selected)
      }}
      onFilterChange={setFilter}
      showItemDividers={true}
      overlayProps={{ width: 'small', height: 'xsmall' }}
    />
  )
}

function DefaultModeHeader(props: DefaultModeHeaderProps) {
  const [selectedDeadline, setSelectedDeadline] = React.useState<Date | null>(null)
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
      <Primer.Header.Item full>{props.counter}件</Primer.Header.Item>
      <Primer.Box display="flex" flexWrap="wrap">
        <Primer.Header.Item>
          <SelectPanel
            title="Status"
            items={[
              { id: 1, text: 'New' },
              { id: 2, text: 'InProgress' },
              { id: 3, text: 'Done' },
              { id: 4, text: 'Pending' },
            ]}
            onSelect={(items) => {
              const selected = _.compact(items.map((item) => item.text))
              props.onStatusFilter(selected)
            }}
          />
        </Primer.Header.Item>
        <Primer.Header.Item>
          <Primer.ActionMenu>
            <DatePicker
              selected={selectedDeadline}
              isClearable
              onChange={(value) => {
                setSelectedDeadline(value)
                props.onDeadlineFilter(value)
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
          <SelectPanel
            title="Counterparty"
            items={props.counterpartyList.map((x, id) => ({ id, text: x }))}
            onSelect={(items) => {
              const selected = _.compact(items.map((item) => item.text))
              props.onCounterpartyFilter(selected)
            }}
          />
        </Primer.Header.Item>
        <Primer.Header.Item>
          <SelectPanel
            title="Today's Action"
            items={[{ id: 1, text: 'On' }]}
            onSelect={(items) => {
              const selected = items.length > 0 && items[0].text === 'On'
              props.onTodaysActionFilter(selected)
            }}
          />
        </Primer.Header.Item>
      </Primer.Box>
    </Primer.Header>
  )
}

export default DefaultModeHeader
