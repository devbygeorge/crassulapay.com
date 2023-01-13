import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NoFees from "@/components/NoFees";
import UseCases from "@/components/UseCases";
import MiniCases from "@/components/MiniCases";

export default function Home() {
  return (
    <>
      <Head>
        <title>Crassula - Home</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header isHome />
      <main className="main">
        <Hero isHome />
        <NoFees />
        <UseCases />
        <MiniCases />
      </main>
      <Footer />
    </>
  );
}
