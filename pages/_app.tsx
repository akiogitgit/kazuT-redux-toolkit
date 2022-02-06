import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// redux toolkitを使用するために、全体をくくる
import { store } from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  // const [queryClient] = useState(() => new QueryClient())
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

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
// QueryClientがRedux使うから、上
export default MyApp
