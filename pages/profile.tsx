import { useEffect, useState } from "react";

import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "@/styles/Profile.module.scss";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser).user);
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
            <h2 className={s.heading}>Account Details</h2>
            <div className={s.details}>
              {user ? (
                <>
                  <div className={s.item}>
                    <strong>Full legal first and middle names</strong>
                    <span>{user["name"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>Full legal last name(s)</strong>
                    <span>{user["surname"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>Email</strong>
                    <span>{user["email"]}</span>
                  </div>
                  <div className={s.item}>
                    <strong>Phone</strong>
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
