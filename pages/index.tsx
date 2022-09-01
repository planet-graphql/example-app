import type { GetServerSideProps, NextPage } from 'next'
import * as Primer from '@primer/react'
import Head from 'next/head'
import React from 'react'
import { ThirdPartyAuth } from 'supertokens-auth-react/recipe/thirdparty'
import supertokensNode from 'supertokens-node'
import { backendConfig } from '../config/backendConfig'
import Session from 'supertokens-node/recipe/session'
import PageFrame from './components/layouts/pageFrame'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export const getServerSideProps: GetServerSideProps = async (context) => {
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err: any) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session.Error.UNAUTHORISED) {
      return { props: {} }
    } else {
      throw err
    }
  }
  return {
    props: { userId: session.getUserId() },
  }
}

const Home: NextPage = () => {
  const session = useSessionContext()
  if (session.loading === true) {
    return null
  }

  return (
    <ThirdPartyAuth>
      <PageFrame>Create Next App</PageFrame>
    </ThirdPartyAuth>
  )
}

export default Home
