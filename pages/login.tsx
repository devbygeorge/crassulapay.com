import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import s from "@/styles/Login.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const handleForm = (e: any) => {
    e.preventDefault();
  };

  const goToNextStep = () => {
    setActiveStepIndex((state) => state + 1);
  };

  const goToLastStep = () => {
    setActiveStepIndex((state) => state - 1);
  };

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
        <div className="container">
          <div className={s.login}>
            <form className={s.form} onSubmit={handleForm}>
              {/* Step 1 - credentials input */}
              <div
                className={`${s.step} ${
                  activeStepIndex === 0 ? s.step_active : ""
                }`}
              >
                <h2>Welcome back.</h2>
                <h3>
                  New to Wise?
                  <Link className={s.signup} href="/register">
                    Sign up
                  </Link>
                </h3>

                <label htmlFor="email">Your email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />
                <label htmlFor="password">Your password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                />
                <button className={s.button} onClick={goToNextStep}>
                  Log in
                </button>
              </div>

              {/* Step 2 - number verify */}
              <div
                className={`${s.step} ${
                  activeStepIndex === 1 ? s.step_active : ""
                }`}
              >
                <h2>We just sent you an SMS</h2>
                <p>
                  To log in, enter the security code we sent to ********1231.
                </p>
                <label htmlFor="code">Your 6-digit code</label>
                <input type="number" name="code" placeholder="Enter code" />
                <Link href="/" className={s.button}>
                  Done
                </Link>
                <p>I didn't receive a code</p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
