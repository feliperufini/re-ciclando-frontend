import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Re-Ciclando</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <script type="text/javascript" src="/js/alpine.min.js"></script> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
