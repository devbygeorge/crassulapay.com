import React, { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SelectCountry from "@/components/SelectCountry";
import s from "@/styles/Register.module.scss";

export default function Register() {
  const [fields, setFields] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [step, setStep] = useState(0);
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [failureMessage, setFailureMessage] = useState(null);
  const [currentPhoneCode, setCurrentPhoneCode] = useState("+995");

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const updateStep = () => {
    setStep((state) => state + 1);
  };

  const toggleTerms = () => {
    setTermsChecked((state) => !state);
  };

  const handleTermsForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isTermsChecked) {
      updateStep();
    }
  };

  const handleRegisterForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const url = `/api/local/register`;

    /* Register user with inputted data */
    axios
      .post(url, {
        name: fields.name,
        surname: fields.surname,
        email: fields.email,
        password: fields.password,
        phone: currentPhoneCode + fields.phone,
      })
      .then((res) => {
        /* Log success response */
        console.log(res);

        /* Move to verification step */
        updateStep();
      })
      .catch((err) => {
        /* Log error response */
        console.log(err);

        /* Display failure message */
        setFailureMessage(err.message);

        /* Remove message after 3 seconds */
        setTimeout(() => {
          setFailureMessage(null);
        }, 3000);
      });
  };

  return (
    <>
      <Head>
        <title>Crassula - Registration</title>
        <meta name="description" content="Crassula" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className="main">
        <div className="container">
          <section className={s.register}>
            {/* Step 1 - Terms and conditions */}
            <div className={s.step} data-visible={step === 0 ? true : false}>
              <form className={s.terms_form} onSubmit={handleTermsForm}>
                <h2 className={s.heading}>Terms & Conditions</h2>
                <p>Terms & Conditions will be added soon.</p>
                <div className={s.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={isTermsChecked}
                    onChange={toggleTerms}
                    required
                  />
                  <label htmlFor="checkbox">Accept Terms & Conditions</label>
                </div>
                <button type="submit" className="button-primary">
                  Next Step
                </button>
              </form>
            </div>

            {/* Step 2 - Fill Information Form */}
            <div className={s.step} data-visible={step === 1 ? true : false}>
              <form className="form" onSubmit={handleRegisterForm}>
                <h2 className={s.heading} data-center={true}>
                  Create your Crassula account
                </h2>

                {/* Name field */}
                <label className="form-label" htmlFor="name">
                  Your name: (Use latin alphabets)
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="..."
                  minLength={2}
                  maxLength={10}
                  pattern="[a-zA-Z]+"
                  value={fields.name}
                  onChange={updateField}
                  required
                  className="form-field"
                />

                {/* Surname field */}
                <label className="form-label" htmlFor="surname">
                  Your surname: (Use latin alphabets)
                </label>
                <input
                  type="text"
                  name="surname"
                  placeholder="..."
                  minLength={2}
                  maxLength={10}
                  pattern="[a-zA-Z]+"
                  value={fields.surname}
                  onChange={updateField}
                  required
                  className="form-field"
                />

                {/* Email field */}
                <label className="form-label" htmlFor="email">
                  Your email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="..."
                  value={fields.email}
                  onChange={updateField}
                  className="form-field"
                  required
                />

                {/* Password field */}
                <label className="form-label" htmlFor="password">
                  Your password: (Min 8 characters)
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="..."
                  minLength={8}
                  value={fields.password}
                  onChange={updateField}
                  className="form-field"
                  required
                />

                {/* Phone number */}
                <div style={{ position: "relative" }}>
                  <label className="form-label" htmlFor="phone">
                    Your phone: (Use digits)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="..."
                    minLength={3}
                    maxLength={13}
                    pattern="^\d+$"
                    value={fields.phone}
                    onChange={updateField}
                    className="form-field"
                    required
                  />
                  <SelectCountry
                    currentPhoneCode={currentPhoneCode}
                    setCurrentPhoneCode={setCurrentPhoneCode}
                  />
                </div>

                <p
                  className="form-message"
                  data-visible={failureMessage ? true : false}
                >
                  {failureMessage}
                </p>
                <button type="submit" className="button-primary">
                  Create Account
                </button>
              </form>
            </div>

            {/* Step 3 - Ask Verification */}
            <div className={s.step} data-visible={step === 2 ? true : false}>
              <h2 className={s.heading}>
                You have to confirm your email address. Please check your email
                account.
              </h2>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
