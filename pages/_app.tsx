import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const [queryClient] = useState(() => new QueryClient()) //変わらん
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  // Query,ReactQueryがreact-query, ProviderがReduxToolkit
  //
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  )
}
// QueryClientがRedux使うから、上
export default MyApp
