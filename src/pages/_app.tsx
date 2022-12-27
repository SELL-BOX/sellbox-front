import '../styles/globals.css'
import type { AppProps } from 'next/app'
import EnvContext from '../configs/EnvContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EnvContext>
      <Component {...pageProps} />
    </EnvContext>
  )
}
