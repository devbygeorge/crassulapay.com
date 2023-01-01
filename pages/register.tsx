import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import s from "@/styles/Register.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);

  const getNextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const getLastStep = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const handleForm = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>CrassulaPay - Registration</title>
        <meta name="description" content="CrassulaPay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">
          <div className={s.register}>
            <form className={s.form} onSubmit={handleForm}>
              {/* Step 1 - email input */}
              <div
                className={`${s.step} ${activeStep === 0 ? s.step_active : ""}`}
              >
                <h2>Create you CrassulaPay account</h2>
                <label htmlFor="">First, enter your email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
                <button className={s.button} onClick={getNextStep}>
                  Next
                </button>
                <hr />
                <div className={s.login}>
                  Already have an account? <Link href="/login">Log in</Link>
                </div>
              </div>

              {/* Step 2 - number input */}
              <div
                className={`${s.step} ${activeStep === 1 ? s.step_active : ""}`}
              >
                <h2>Verify your phone number with a code</h2>
                <label htmlFor="phone">
                  It helps us keep your account secure.
                </label>
                <input type="tel" name="phone" placeholder="Your number" />
                <button className={s.button} onClick={getNextStep}>
                  Send a verification code
                </button>
              </div>

              {/* Step 3 - enter code */}
              <div
                className={`${s.step} ${activeStep === 2 ? s.step_active : ""}`}
              >
                <h2>Enter the 6-digit code</h2>
                <h3>We sent it to +5848465465.</h3>
                <label htmlFor="code">Your 6-digit code</label>
                <input type="number" name="code" placeholder="Your code" />
                <button className={s.button} onClick={getNextStep}>
                  Submit
                </button>
                <button className={s.button}>I didn't reveive a code</button>
              </div>

              {/* Step 4 - create password */}
              <div
                className={`${s.step} ${activeStep === 3 ? s.step_active : ""}`}
              >
                <h2>Create your password</h2>
                <label htmlFor="password">Your password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                />
                <p>
                  Password must contain a letter and a number, and be minimum of
                  9 characters
                </p>
                <button className={s.button} onClick={getNextStep}>
                  Continue
                </button>
              </div>

              {/* Step 5 - Success notification */}
              <div
                className={`${s.step} ${activeStep === 4 ? s.step_active : ""}`}
              >
                <h2>You registered successfully</h2>
                <Link className={s.button} href="/">
                  Continue
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
