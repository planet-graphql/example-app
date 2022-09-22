import React from 'react'
import * as Primer from '@primer/react'

type Props = {
  onEdit: () => void
  onBack: () => void
}

function DetailTodoButtonGroup(props: Props) {
  return (
    <Primer.Box aria-label="edit" display="flex" sx={{ gap: '2px' }}>
      <Primer.Box flexGrow={1}></Primer.Box>
      <Primer.Box onClick={props.onBack}>
        <Primer.Button>Back</Primer.Button>
      </Primer.Box>
      <Primer.Box onClick={props.onEdit}>
        <Primer.Button variant="outline">Edit</Primer.Button>
      </Primer.Box>
    </Primer.Box>
  )
}

export default DetailTodoButtonGroup
