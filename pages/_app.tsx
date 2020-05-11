import { AppProps } from "next/app";
import Head from "next/head";

export default function Root({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>title</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
