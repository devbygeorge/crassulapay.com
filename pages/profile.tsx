import Head from "next/head";
import { useState, useEffect } from "react";
import s from "@/styles/Profile.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type User = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser).user);
    } else {
      setUser(null);
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
          <div className={s.profile}>
            <h2>Account Details</h2>
            <div className={s.details}>
              {user ? (
                <>
                  <h3>
                    <strong>Username: </strong>
                    {user.username}
                  </h3>
                  <h3>
                    <strong>Name: </strong>
                    {user.name}
                  </h3>
                  <h3>
                    <strong>Surname: </strong>
                    {user.surname}
                  </h3>

                  <h3>
                    <strong>Email: </strong>
                    {user.email}
                  </h3>
                  <h3>
                    <strong>Address: </strong>
                    Coming Soon
                  </h3>
                  <h3>
                    <strong>Phone: </strong>
                    Coming Soon
                  </h3>
                </>
              ) : (
                "Please Log in to see account details"
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
