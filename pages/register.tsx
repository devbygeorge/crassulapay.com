import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import s from "@/styles/Register.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [fields, setFields] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    checked: false,
    // address: "",
    // phone: "",
  });

  const router = useRouter();

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const getNextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleInfoForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Info form handled");

    getNextStep();
  };

  const handleTermsForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Terms form handled");

    const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/auth/local/register`;

    // Post at strapi
    axios
      .post(url, {
        username: fields.username,
        name: fields.name,
        surname: fields.surname,
        email: fields.email,
        password: fields.password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/profile");
      })
      .catch((err) => console.log(err));
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
          <div className={s.register}>
            {/* Step 1 - Fill Information Form */}
            <div className={`${s.step} ${activeStep === 0 ? s.show : ""}`}>
              <form className={s.fill_form} onSubmit={handleInfoForm}>
                <h2>Create your Crassula account</h2>

                {/* Name field */}
                <div className={s.field_wrapper}>
                  <label htmlFor="name">Your username:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your username"
                    required
                    value={fields.username}
                    onChange={updateField}
                  />
                </div>
                <div className={s.field_wrapper}>
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
                <div className={s.field_wrapper}>
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

                {/* Email field */}
                <div className={s.field_wrapper}>
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
                <div className={s.field_wrapper}>
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
                {/* Address field */}
                {/* <div className={s.field_wrapper}>
                  <label htmlFor="address">Your address:</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Your address"
                    required
                    value={fields.address}
                    onChange={updateField}
                  />
                  </div> */}
                {/* Phone number */}
                {/* <div className={s.field_wrapper}>
                  <label htmlFor="phone">Your phone:</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone"
                    required
                    value={fields.phone}
                    onChange={updateField}
                  />
                  </div> */}
                <button type="submit" className={s.button}>
                  Next Step
                </button>
              </form>
            </div>

            {/* Step 2 - Terms and conditions */}
            <div className={`${s.step} ${activeStep === 1 ? s.show : ""}`}>
              <form className={s.terms_form} onSubmit={handleTermsForm}>
                <h2>Terms & Conditions</h2>
                <p>Terms & Conditions will be added soon.</p>
                {/* Accept terms & conditions checkbox */}
                <div className={s.terms_checkbox}>
                  <input
                    type="checkbox"
                    name="checked"
                    checked={fields.checked}
                    onChange={() => {
                      setFields((prevState) => ({
                        ...prevState,
                        checked: !prevState.checked,
                      }));
                    }}
                    required
                  />
                  <label htmlFor="accept">Accept Terms & Conditions</label>
                </div>
                <button type="submit" className={s.button}>
                  Finish
                </button>
              </form>
            </div>

            {/* User validation with veriff */}
            {/* <div className={`${s.step} ${activeStep === 1 ? s.show : ""}`}>
              <div className={s.validation}>
                <h2>User Validation</h2>
                <button className={s.button} onClick={getNextStep}>
                  Next Step
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
