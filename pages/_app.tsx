import type { AppProps } from 'next/app'
import * as Primer from '@primer/react'
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'
import React from 'react'
import { redirectToAuth } from 'supertokens-auth-react/recipe/thirdparty'
import * as SuperTokensConfig from '../utils/supertokens/frontendConfig'
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

  return (
    <SuperTokensWrapper onSessionExpired={() => redirectToAuth()}>
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
