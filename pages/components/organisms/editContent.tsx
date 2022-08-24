import React from 'react'
import * as Primer from '@primer/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactFCWrapper } from '../../_app'
import EditButtonGroup from './editButtonGroup'
import { todoStatus, TodoStatus } from '../../../lib/tokens'

type FormValue = {
  title: string
  content: string
  note: string
  counterParty: string
  deadline: Date
  todaysAction: boolean
  status: TodoStatus
}

type Props = {
  formValue: FormValue
  onUpdate: (args: FormValue) => void
  onDelete: () => void
  onCancel: () => void
}

type RowProps = {
  item: string
  children: React.ReactNode
}

function Row(props: RowProps) {
  return (
    <Primer.Box
      display="flex"
      alignItems="center"
      borderColor="border.default"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      py={3}
    >
      <Primer.Box fontSize={2} width={150} flex="0 0 auto">
        {props.item}
      </Primer.Box>
      {props.children}
    </Primer.Box>
  )
}

function EditContentForm(props: Props) {
  const FormControlLabel = Primer.FormControl.Label as ReactFCWrapper<
    typeof Primer.FormControl.Label
  >

  const [formValue, setFormValue] = React.useState<FormValue>(props.formValue)

  return (
    <Primer.Box borderColor="border.default">
      <Row item="Title">
        <Primer.TextInput
          block
          required
          defaultValue={props.formValue.title}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              title: e.target.value,
            })
          }}
        />
      </Row>
      <Row item="Content">
        <Primer.Textarea
          rows={3}
          block
          resize="vertical"
          defaultValue={props.formValue.content}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              content: e.target.value,
            })
          }}
        ></Primer.Textarea>
      </Row>
      <Row item="Note">
        <Primer.Textarea
          rows={3}
          block
          resize="vertical"
          defaultValue={props.formValue.note}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              note: e.target.value,
            })
          }}
        ></Primer.Textarea>
      </Row>
      <Row item="CounterParty">
        <Primer.TextInput
          block
          defaultValue={props.formValue.counterParty}
          onChange={(e) => {
            setFormValue({
              ...formValue,
              counterParty: e.target.value,
            })
          }}
        />
      </Row>
      <Primer.Box
        display="flex"
        borderColor="border.default"
        borderBottomWidth={1}
        borderBottomStyle="solid"
        py={3}
      >
        <Primer.Box
          display="flex"
          alignItems="center"
          width={0.5}
          paddingRight={20}
          sx={{ boxSizing: 'border-box' }}
        >
          <Primer.Box fontSize={2} width={150} flex="0 0 auto">
            Deadline
          </Primer.Box>
          <Primer.FormControl>
            <FormControlLabel visuallyHidden>Deadline</FormControlLabel>
            <DatePicker
              selected={formValue.deadline}
              onChange={(deadline) => {
                if (deadline !== null)
                  setFormValue({
                    ...formValue,
                    deadline,
                  })
              }}
              placeholderText="mm/dd/yyyy"
              customInput={<Primer.TextInput />}
              required
            ></DatePicker>
          </Primer.FormControl>
        </Primer.Box>
        <Primer.Box display="flex" alignItems="center" width={0.5}>
          <Primer.Box fontSize={2} width={150}>
            Today&apos;s Action
          </Primer.Box>
          <Primer.Box>
            <Primer.ToggleSwitch
              aria-labelledby="switchLabel"
              size="small"
              statusLabelPosition="end"
              defaultChecked={props.formValue.todaysAction}
              onChange={(isOn) => {
                setFormValue({
                  ...formValue,
                  todaysAction: isOn,
                })
              }}
            />
          </Primer.Box>
        </Primer.Box>
      </Primer.Box>
      <Row item="Status">
        <Primer.FormControl>
          <FormControlLabel visuallyHidden>Status</FormControlLabel>
          <Primer.Select
            defaultValue={props.formValue.status}
            onChange={(e) => {
              setFormValue({
                ...formValue,
                status: e.target.value as TodoStatus,
              })
            }}
          >
            <Primer.Select.OptGroup label="Status">
              {todoStatus.map((x) => (
                <Primer.Select.Option key={x} value={x}>
                  {x}
                </Primer.Select.Option>
              ))}
            </Primer.Select.OptGroup>
          </Primer.Select>
        </Primer.FormControl>
      </Row>
      <Primer.Box py={3}>
        <EditButtonGroup
          onUpdate={() => props.onUpdate(formValue)}
          onDelete={() => props.onDelete()}
          onCancel={() => props.onCancel()}
        ></EditButtonGroup>
      </Primer.Box>
    </Primer.Box>
  )
}

export default EditContentForm
