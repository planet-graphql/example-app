import React from 'react'
import * as Primer from '@primer/react'

type Props = {
  topPath: string
  onLogout: () => void
}

function Header(props: Props) {
  return (
    <Primer.Header sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Primer.Header.Item></Primer.Header.Item>
      <Primer.Header.Link href={props.topPath} sx={{ fontSize: 24 }}>
        ToDo
      </Primer.Header.Link>
      <Primer.Header.Item onClick={() => props.onLogout()}>
        <Primer.Button size="large">LogOut</Primer.Button>
      </Primer.Header.Item>
    </Primer.Header>
  )
}

export default Header
