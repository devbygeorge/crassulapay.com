import React, { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SelectCountry from "@/components/SelectCountry";
import s from "@/styles/Register.module.scss";
import translations from "translations";
import { Locales } from "typings";

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

  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof Locales];

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
    const url = `/api/createUser`;

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

        /* Set user into local storage */
        localStorage.setItem("user", JSON.stringify(res.data.user));

        /* Move to profile page */
        router.push("/profile");
      })
      .catch((err) => {
        /* Log error response */
        console.log(err);

        /* Display failure message */
        setFailureMessage(err.response.data.message);

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
                <h2 className={s.heading}>{t["terms_and_conditions"]}</h2>
                <p>
                  {t["terms_and_conditions"]} {t["will_be_added_soon"]}
                </p>
                <div className={s.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={isTermsChecked}
                    onChange={toggleTerms}
                    required
                  />
                  <label htmlFor="checkbox">
                    {t["accept_terms_and_conditions"]}
                  </label>
                </div>
                <button type="submit" className="button-primary">
                  {t["next_step"]}
                </button>
              </form>
            </div>

            {/* Step 2 - Fill Information Form */}
            <div className={s.step} data-visible={step === 1 ? true : false}>
              <form className="form" onSubmit={handleRegisterForm}>
                <h2 className={s.heading} data-center={true}>
                  {t["create_your_crassula_account"]}
                </h2>

                {/* Name field */}
                <label className="form-label" htmlFor="name">
                  {t["your_name"]}: {t["use_latin_alphabets"]}
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
                  {t["your_surname"]}: {t["use_latin_alphabets"]}
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
                  {t["your_email"]}:
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
                  {t["your_password"]}: {t["min_eight_characters"]}
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
                    {t["your_phone"]}: {t["use_digits"]}
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
                  {t["create_account"]}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
