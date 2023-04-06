import { useState } from "react";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "@/styles/Login.module.scss";

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [passwordShown, setPasswordShown] = useState(false);
  const [isFieldIncorrect, setFieldIncorrect] = useState(false);

  const router = useRouter();

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const url = `/api/auth/local`;

    /* Authenticate user with inputted data */
    axios
      .post(url, {
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        /* Log success response */
        console.log(res);

        /* Set user data into local storage */
        const userData = JSON.stringify(res.data);
        localStorage.setItem("user", userData);

        /* Route user to profile page */
        router.push("/profile");
      })
      .catch((err) => {
        /* Log error response */
        console.log(err);

        /* Show message to user that some fields are incorrect */
        setFieldIncorrect(true);

        /* Remove message after 3 seconds */
        setTimeout(() => {
          setFieldIncorrect(false);
        }, 3000);
      });
  };

  return (
    <>
      <Head>
        <title>Crassula - Login</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">
          <section className={s.login}>
            <p className={s.welcome_text}>Welcome back.</p>
            <p>
              New to Crassula?
              <Link href="/register" className={s.signup_link}>
                Sign up
              </Link>
            </p>
            <form className="form" onSubmit={handleForm}>
              {/* Email field */}
              <label className="form-label" htmlFor="email">
                Your email:
              </label>
              <input
                className="form-field"
                type="email"
                name="email"
                placeholder="..."
                value={fields.email}
                onChange={updateField}
                required
              />
              {/* Password field */}
              <label className="form-label" htmlFor="password">
                Your password:
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-field"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="..."
                  value={fields.password}
                  onChange={updateField}
                  required
                />
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onClick={() => setPasswordShown((state) => !state)}
                />
              </div>
              <p
                className="form-message"
                data-visible={isFieldIncorrect ? true : false}
              >
                Email or password is incorrect.
              </p>
              <button type="submit" className="button-primary">
                Log in
              </button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
