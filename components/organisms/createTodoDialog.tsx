import React from 'react'
import * as Primer from '@primer/react'
import CreateTodoContentForm from './createTodoContentForm'
import { FormValue } from '../../lib/tokens'

type Props = {
  onCreate: (formValue: FormValue) => void
}

function CreateTodoDialog(props: Props) {
  const returnFocusRef = React.useRef(null)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Primer.Box>
      <Primer.Button
        ref={returnFocusRef}
        onClick={() => setIsOpen(true)}
        variant="outline"
      >
        New
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
          <CreateTodoContentForm
            formValue={{
              title: '',
              content: '',
              note: '',
              counterparty: '',
              deadline: new Date(),
              todaysAction: false,
              status: 'New',
            }}
            onCreate={(value) => {
              props.onCreate(value)
              setIsOpen(false)
            }}
          ></CreateTodoContentForm>
        </Primer.Box>
      </Primer.Dialog>
    </Primer.Box>
  )
}

export default CreateTodoDialog
