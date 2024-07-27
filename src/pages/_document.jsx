import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="../../../icons/vou_logo.svg" sizes='any'/>
      </Head>
      <body className='bg-background'>
        <Main />
        <NextScript />
        
      </body>
    </Html>
  )
}
