import Head from "next/head";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>CrassulaPay - Login</title>
        <meta name="description" content="CrassulaPay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">Login Page</div>
      </main>
      <Footer />
    </>
  );
}
