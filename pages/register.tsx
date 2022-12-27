import Head from "next/head";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>CrassulaPay - Register</title>
        <meta name="description" content="CrassulaPay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">Registration Page</div>
      </main>
      <Footer />
    </>
  );
}
