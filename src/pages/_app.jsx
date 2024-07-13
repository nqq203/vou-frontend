import RootLayout from '@components/_layout'
import '../../styles/global.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App({Component, pageProps}) {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}