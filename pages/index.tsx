import { GetStaticProps } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MiniCases from "@/components/MiniCases";
import NoFees from "@/components/NoFees";
import UseCases from "@/components/UseCases";
import { MiniCase, Page, UseCase } from "typings";

type Props = {
  page: Page;
  miniCases: MiniCase[];
  useCases: UseCase[];
};

export default function Home({ page, miniCases, useCases }: Props) {
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
        <Hero page={page} />
        <NoFees page={page} />
        <UseCases useCases={useCases} />
        <MiniCases miniCases={miniCases} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data`, {
    method: "post",
    body: JSON.stringify({
      locale: locale,
    }),
  });

  const { page, miniCases, useCases } = await res.json();

  return {
    props: {
      page,
      miniCases,
      useCases,
    },
    revalidate: 10,
  };
};
