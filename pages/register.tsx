import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import s from "@/styles/Register.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [fields, setFields] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    password: "",
    phone: "",
  });

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const getNextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Post on backend
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    console.log(data);

    // Clear fields
    setFields({
      name: "",
      surname: "",
      address: "",
      email: "",
      password: "",
      phone: "",
    });

    // Successfully move to the next step
    getNextStep();
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
            {/* Registration form */}
            <div className={`${s.step} ${activeStep === 0 ? s.show : ""}`}>
              <h2>Create your CrassulaPay account</h2>

              <form className={s.form} onSubmit={handleForm}>
                {/* Name field */}
                <div>
                  <label htmlFor="name">Your name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    value={fields.name}
                    onChange={updateField}
                  />
                </div>
                {/* Surname field */}
                <div>
                  <label htmlFor="surname">Your surname:</label>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Your surname"
                    required
                    value={fields.surname}
                    onChange={updateField}
                  />
                </div>
                {/* Address field */}
                <div>
                  <label htmlFor="address">Your address:</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your address"
                    required
                    value={fields.address}
                    onChange={updateField}
                  />
                </div>
                {/* Email field */}
                <div>
                  <label htmlFor="email">Your email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    value={fields.email}
                    onChange={updateField}
                  />
                </div>
                {/* Password field */}
                <div>
                  <label htmlFor="password">Your password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                    value={fields.password}
                    onChange={updateField}
                  />
                </div>
                {/* Phone number */}
                <div>
                  <label htmlFor="phone">Your phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    required
                    value={fields.phone}
                    onChange={updateField}
                  />
                </div>
                <button className={s.button} type="submit">
                  Next Step
                </button>
              </form>
            </div>

            {/* User validation with veriff */}
            <div className={`${s.step} ${activeStep === 1 ? s.show : ""}`}>
              <div className={s.validation}>
                <h2>User Validation</h2>
                <button className={s.button} onClick={getNextStep}>
                  Next Step
                </button>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className={`${s.step} ${activeStep === 2 ? s.show : ""}`}>
              <div className={s.terms}>
                <h2>Terms & Conditions</h2>
                <p>
                  This Privacy Policy is an overview of how we collect, use, and
                  process your personal data when you use our website
                  https://crassulapay.com, our web application, our mobile app
                  and email messages that we send to you jointly called:
                  “Services”. If anything here only applies to one of our
                  services, we’ll explicitly point this out to you.
                </p>
                <p>
                  Please read this Policy carefully, as it becomes legally
                  binding when you use our Services. For the full definition of
                  the capitalised words here, check our Customer Agreement. We
                  take privacy and protection of your data very seriously and
                  are committed to handling the personal information of those we
                  engage with, whether customers, suppliers or colleagues
                  responsibly and in a way that meets the legal requirements of
                  the countries in which we operate.
                </p>
                <p>
                  By continuing your interactions with us, such as by submitting
                  information to us, or using our Services, you confirm that you
                  understand and consent to the collection, use, disclosure, and
                  processing of your personal data in the manner as set forth in
                  this Privacy Policy.
                </p>

                {/* Accept terms & conditions checkbox */}
                <div className={s.terms_checkbox}>
                  <input type="checkbox" name="accept" />
                  <label htmlFor="accept">Accept Terms & Conditions</label>
                </div>
                <Link href="/" className={s.button}>
                  Done
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
