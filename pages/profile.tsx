import { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "@/styles/Profile.module.scss";
import translations from "translations";
import { Locales } from "typings";

export default function Profile() {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof Locales];

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Crassula - Profile</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">
          <section className={s.profile}>
            <h2 className={s.heading}>{t["account_details"]}</h2>
            <div className={s.details}>
              {user ? (
                <>
                  <div className={s.item}>
                    <strong>{t["full_legal_first_name"]}</strong>
                    <span>{user["name"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>{t["full_legal_last_name"]}</strong>
                    <span>{user["surname"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>{t["email"]}</strong>
                    <span>{user["email"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>{t["phone"]}</strong>
                    <span>{user["phone"]}</span>
                  </div>
                </>
              ) : (
                "Please Log in to see account details"
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
