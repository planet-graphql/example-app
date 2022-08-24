import React from 'react'
import * as Primer from '@primer/react'
import { format } from 'date-fns'

type Props = {
  title: string
  content: string
  note: string
  counterParty: string
  deadline: Date
  todaysAction: boolean
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

function DetailContent(props: Props) {
  return (
    <Primer.Box borderColor="border.default">
      <Row title="Title">{props.title}</Row>
      <Row title="Content">{props.content}</Row>
      <Row title="Note">{props.note}</Row>
      <Row title="CounterParty">{props.counterParty}</Row>
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
            {props.deadline !== undefined ? format(props.deadline, 'dd/MM/yyyy') : '--'}
          </Primer.Box>
        </Primer.Box>
        <Primer.Box display="flex" width={0.5}>
          <Primer.Box fontSize={2} width={150}>
            Today&apos;s Action
          </Primer.Box>
          <Primer.Box position="absolute" marginLeft={150}>
            {props.todaysAction ? '●' : ''}
          </Primer.Box>
        </Primer.Box>
      </Primer.Box>
    </Primer.Box>
  )
}

export default DetailContent
