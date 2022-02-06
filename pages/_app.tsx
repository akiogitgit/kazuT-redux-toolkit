import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// redux toolkitを使用するために、全体をくくる
import { store } from '../app/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  )
}
// QueryClientの中にReactQueryDevtoolsがあれば、後の括りはCompoだけでいい
export default MyApp
