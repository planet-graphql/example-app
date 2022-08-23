import React from 'react'
import * as Primer from '@primer/react'
import CreateContentForm from './CreateContent'
import { FormValue } from '../../../lib/tokens'

type Props = {
  onCreate: (formValue: FormValue) => void
}

function NewTodo(props: Props) {
  const returnFocusRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Primer.Box>
      <Primer.Button ref={returnFocusRef} onClick={() => setIsOpen(true)}>
        NewTodo
      </Primer.Button>
      <Primer.Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header-id"
        wide
        sx={{ height: '100%', overflowY: 'scroll' }}
      >
        <Primer.Dialog.Header id="header-id">new Todo</Primer.Dialog.Header>
        <Primer.Box p={3}>
          <CreateContentForm
            formValue={{
              title: '',
              content: '',
              note: '',
              counterParty: '',
              deadline: new Date(),
              todaysAction: false,
              status: 'New',
            }}
            onCreate={(value) => props.onCreate(value)}
          ></CreateContentForm>
        </Primer.Box>
      </Primer.Dialog>
    </Primer.Box>
  )
}

export default NewTodo
