import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../compoment/header'

export default function App({ Component, pageProps }: AppProps) {

  return(
    
    <Component {...pageProps} />
  
  )
}
