import React from 'react'
import * as Primer from '@primer/react'

type Props = {
  onUpdate: () => void
  onDelete: () => void
  onCancel: () => void
}

function EditButtonGroup(props: Props) {
  return (
    <Primer.Box aria-label="edit" display="flex" sx={{ gap: '2px' }}>
      <Primer.Box onClick={props.onDelete}>
        <Primer.Button variant="danger">Delete</Primer.Button>
      </Primer.Box>
      <Primer.Box flexGrow={1}></Primer.Box>
      <Primer.Box onClick={props.onCancel}>
        <Primer.Button>Cancel</Primer.Button>
      </Primer.Box>
      <Primer.Box onClick={props.onUpdate}>
        <Primer.Button variant="outline">Update</Primer.Button>
      </Primer.Box>
    </Primer.Box>
  )
}

export default EditButtonGroup
