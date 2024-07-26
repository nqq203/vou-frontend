import RootLayout from '@components/_layout'
import '../../styles/global.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../redux/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ScrollView from '@components/common/ScrollView'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  const layoutScrollViewStyle = {
    minHeight: "100vh",
    maxHeight: "100vh",
    backgroundColor: "#FFFBF8"
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollView style={layoutScrollViewStyle}>
            <RootLayout>
              <Component {...pageProps} />
            </RootLayout>
          </ScrollView>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}