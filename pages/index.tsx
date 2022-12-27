import Head from "next/head";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crassula Pay</title>
        <meta name="description" content="Crassula Pay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main">Hello World</main>
      <Footer />
    </>
  );
}
