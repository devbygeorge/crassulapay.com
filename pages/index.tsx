import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MiniCases from "@/components/MiniCases";
import NoFees from "@/components/NoFees";
import UseCases from "@/components/UseCases";

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
