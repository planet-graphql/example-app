import React from 'react'
import * as Primer from '@primer/react'
import { format } from 'date-fns'
import DetailTodoButtonGroup from './detailTodoButtonGroup'
import { FormValue } from '../../../lib/tokens'

type Props = {
  values: FormValue
  onEdit: () => void
  onBack: () => void
}

type RowProps = {
  title: string
  children: string
}

function Row(props: RowProps) {
  return (
    <Primer.Box
      display="flex"
      borderColor="border.default"
      borderBottomWidth={1}
      borderBottomStyle="solid"
      py={3}
    >
      <Primer.Box fontSize={2} width={150} flex="0 0 auto">
        {props.title}
      </Primer.Box>
      <Primer.Box sx={{ overflowWrap: 'break-word', minWidth: 1 }} flex="1 1 0">
        {props.children}
      </Primer.Box>
    </Primer.Box>
  )
}

function DetailTodoContent(props: Props) {
  return (
    <Primer.Box borderColor="border.default">
      <Row title="Title">
        {props.values.title.trim() !== '' ? props.values.title : '(no title)'}
      </Row>
      <Row title="Content">{props.values.content}</Row>
      <Row title="Note">{props.values.note}</Row>
      <Row title="Counterparty">{props.values.counterparty}</Row>
      <Primer.Box
        display="flex"
        borderColor="border.default"
        borderBottomWidth={1}
        borderBottomStyle="solid"
        py={3}
      >
        <Primer.Box
          display="flex"
          width={0.5}
          paddingRight={20}
          sx={{ boxSizing: 'border-box' }}
        >
          <Primer.Box fontSize={2} width={150} flex="0 0 auto">
            Deadline
          </Primer.Box>
          <Primer.Box flex="1 1 0" minWidth={50} sx={{ overflowWrap: 'break-word' }}>
            {props.values.deadline !== undefined
              ? format(new Date(props.values.deadline), 'dd/MM/yyyy')
              : '--'}
          </Primer.Box>
        </Primer.Box>
        <Primer.Box display="flex" width={0.5}>
          <Primer.Box fontSize={2} width={150}>
            Today&apos;s Action
          </Primer.Box>
          <Primer.Box position="absolute" marginLeft={150}>
            {props.values.todaysAction ? '●' : ''}
          </Primer.Box>
        </Primer.Box>
      </Primer.Box>
      <Row title="Status">{props.values.status}</Row>
      <Primer.Box py={3}>
        <DetailTodoButtonGroup
          onEdit={() => props.onEdit()}
          onBack={() => props.onBack()}
        ></DetailTodoButtonGroup>
      </Primer.Box>
    </Primer.Box>
  )
}

export default DetailTodoContent
