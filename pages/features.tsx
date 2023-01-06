import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Features() {
  return (
    <>
      <Head>
        <title>Crassula - Features</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">Features Page</div>
      </main>
      <Footer />
    </>
  );
}
