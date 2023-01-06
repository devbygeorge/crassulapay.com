import Head from "next/head";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>Crassula - Pricing</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">Pricing Page</div>
      </main>
      <Footer />
    </>
  );
}
