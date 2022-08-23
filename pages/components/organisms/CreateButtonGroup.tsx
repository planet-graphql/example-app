import React from 'react'
import * as Primer from '@primer/react'

type Props = {
  onCreate: () => void
}

function CreateButtonGroup(props: Props) {
  return (
    <Primer.Box aria-label="edit" display="flex" sx={{ gap: '2px' }}>
      <Primer.Box flexGrow={1}></Primer.Box>
      <Primer.Box onClick={props.onCreate}>
        <Primer.Button variant="outline">Create</Primer.Button>
      </Primer.Box>
    </Primer.Box>
  )
}

export default CreateButtonGroup
