import type { AppProps } from 'next/app'
import * as Primer from '@primer/react'

export type ReactFCWrapper<T> = T extends React.FC<infer U>
  ? React.FC<U & { children?: React.ReactNode }>
  : T

type ThemeProviderProps = Primer.ThemeProviderProps & {
  children?: React.ReactNode
}
export const ThemeProvider = Primer.ThemeProvider as React.FC<ThemeProviderProps>

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
