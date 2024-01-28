import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
