import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return(
    <>
    
    <meta charSet='utf-8'/>
    <meta httpEquiv="X-UA-Compatible" content="IE=Edge; chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <Component {...pageProps} />
    </>
  )
}
