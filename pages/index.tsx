import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import UseCase from "@/components/UseCase";

export default function Home() {
  return (
    <>
      <Head>
        <title>CrassulaPay - Home</title>
        <meta name="description" content="CrassulaPay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header isHome />
      <main className="main">
        <Hero isHome />
        <UseCase />
      </main>
      <Footer />
    </>
  );
}
