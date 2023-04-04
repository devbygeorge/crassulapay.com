import { useState } from "react";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "@/styles/Login.module.scss";


export default function Login() {
  const [fields, setFields] = useState({ identifier: "", password: "" });
  const [authErr, setAuthErr] = useState(false);
  const router = useRouter();

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Login form handled");

    const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/auth/local`;

    // Post at strapi
    axios
      .post(url, {
        identifier: fields.identifier,
        password: fields.password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/profile");
      })
      .catch((err) => {
        setAuthErr(true);

        setTimeout(() => {
          setAuthErr(false);
        }, 3000);
      });
  };

  const togglePassword = () => {
    var passwordField = document.getElementById(
      "password-field"
    ) as HTMLInputElement;
    if (passwordField?.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
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
          <div className={s.login}>
            {/* Step 1 - credentials input */}
            <div className={s.step}>
              <form className={s.form} onSubmit={handleForm}>
                <h2>Welcome back.</h2>
                <h3>
                  New to Crassula?
                  <Link className={s.signup} href="/register">
                    Sign up
                  </Link>
                </h3>
                {/* Email field */}
                <label htmlFor="email">Your email:</label>
                <input
                  className={s.field}
                  type="email"
                  name="identifier"
                  placeholder="Your email"
                  required
                  value={fields.identifier}
                  onChange={updateField}
                />
                {/* Password field */}
                <label htmlFor="password">Your password:</label>
                <div className={s.password_wrapper}>
                  <input
                    className={s.field}
                    id="password-field"
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                    value={fields.password}
                    onChange={updateField}
                  />
                  <input
                    className={s.checkbox}
                    type="checkbox"
                    onClick={togglePassword}
                  />
                </div>
                <p
                  style={{
                    display: !authErr ? "none" : "",
                  }}
                >
                  Email or password is incorrect.
                </p>
                <button className={s.button} type="submit">
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
