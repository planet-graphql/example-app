import * as Primer from '@primer/react'
import React from 'react'
import dynamic from 'next/dynamic'
import SuperTokens from 'supertokens-auth-react'
import { redirectToAuth } from 'supertokens-auth-react/recipe/thirdpartyemailpassword'

const SuperTokensComponentNoSSR = dynamic(
  new Promise((res: any) => res(SuperTokens.getRoutingComponent)) as any,
  { ssr: false },
)

function Auth() {
  React.useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth()
    }
  }, [])

  return (
    <Primer.Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <SuperTokensComponentNoSSR />
    </Primer.Box>
  )
}

export default Auth
