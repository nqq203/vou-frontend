'use client';
import '../../styles/global.css'
import RootLayoutComponent from '@components/features/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../redux/store'
import { Html } from 'next/document';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Html lang='en'>  
            <body>{children}</body>
          </Html>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}
