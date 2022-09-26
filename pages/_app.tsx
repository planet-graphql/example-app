import type { AppProps } from 'next/app'
import * as Primer from '@primer/react'
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'
import React from 'react'
import Session from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react/recipe/thirdparty'
import * as SuperTokensConfig from '../config/frontendConfig'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useRouter } from 'next/router'

export type ReactFCWrapper<T> = T extends React.FC<infer U>
  ? React.FC<U & { children?: React.ReactNode }>
  : T

type ThemeProviderProps = Primer.ThemeProviderProps & {
  children?: React.ReactNode
}
export const ThemeProvider = Primer.ThemeProvider as React.FC<ThemeProviderProps>

if (typeof window !== 'undefined') {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig())
}

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  React.useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === 'needs-refresh') {
        if (await Session.attemptRefreshingSession()) {
          location.reload()
        } else {
          redirectToAuth()
        }
      }
    }
    doRefresh()
  }, [pageProps.fromSupertokens])

  if (pageProps.fromSupertokens === 'needs-refresh') {
    return null
  }

  return (
    <SuperTokensWrapper
      onSessionExpired={() => {
        router.push('/')
      }}
    >
      <ApolloProvider client={client}>
        <Primer.SSRProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Primer.SSRProvider>
      </ApolloProvider>
    </SuperTokensWrapper>
  )
}

export default MyApp
