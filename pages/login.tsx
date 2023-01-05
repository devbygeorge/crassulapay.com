import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import s from "@/styles/Login.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const getNextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Post on backend
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    console.log(data);

    // Clear fields
    setFields({
      email: "",
      password: "",
    });

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    }
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
            {/* Step 1 - credentials input */}
            <div className={`${s.step} ${activeStep === 0 ? s.show : ""}`}>
              <form className={s.form} onSubmit={handleForm}>
                <h2>Welcome back.</h2>
                <h3>
                  New to Wise?
                  <Link className={s.signup} href="/register">
                    Sign up
                  </Link>
                </h3>

                {/* Email field */}
                <label htmlFor="email">Your email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={fields.email}
                  onChange={updateField}
                />

                {/* Password field */}
                <label htmlFor="password">Your password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  value={fields.password}
                  onChange={updateField}
                />

                <button className={s.button} type="submit">
                  Log in
                </button>
              </form>
            </div>

            {/* Step 2 - number verification */}
            {/* <div className={`${s.step} ${activeStep === 1 ? s.show : ""}`}>
              <form className={s.form} onSubmit={handleForm}>
                <h2>We just sent you an SMS</h2>
                <p style={{ marginTop: ".5rem" }}>
                  To log in, enter the security code we sent to your email
                  address.
                </p>
                <label htmlFor="code">Your 6-digit code</label>
                <input
                  type="number"
                  name="code"
                  placeholder="Enter code"
                  required
                />
                <button className={s.button} type="submit">
                  Done
                </button>
                <p>I didn't receive a code</p>
              </form>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
