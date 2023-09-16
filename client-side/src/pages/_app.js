import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>ChitChat</title>
        <link rel="shortcut icon" href='/whatsapp.png'/>
      </Head>
      <Component {...pageProps} />

    </Provider>
  )
}
