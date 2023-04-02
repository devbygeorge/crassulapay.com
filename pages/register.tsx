import React, { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import s from "@/styles/Register.module.scss";

type Country = {
  name: string;
  dial_code: string;
  code: string;
};

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [fields, setFields] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    checked: false,
    // address: "",
  });

  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [countries, setCountries] = useState([]);
  const [activeCode, setActiveCode] = useState("+93");
  const [isCodeMenuActive, setCodeMenuActive] = useState(false);

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));
  };

  const getNextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const registerUser = () => {
    const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/auth/local/register`;

    // Post at strapi
    axios
      .post(url, {
        username: fields.email,
        name: fields.name,
        surname: fields.surname,
        email: fields.email,
        password: fields.password,
        phone: activeCode + fields.phone,
      })
      .then((res) => {
        console.log(res);
        getNextStep();
      })
      .catch((err) => {
        console.log(err);
        setActiveStep(0);

        if (err.response.data.error.name === "ValidationError") {
          setErrorMsg(
            `${err.response.data.error.message} - ${err.response.data.error.details.errors[0].path[0]}`
          );
        } else {
          setErrorMsg(err.response.data.error.message);
        }

        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
      });
  };

  const handleInfoForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Info form submitted");

    if (fields.checked) {
      registerUser();
    } else {
      getNextStep();
    }
  };

  const handleTermsForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log("Terms form submitted");

    registerUser();
  };

  useEffect(() => {
    const url = `https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json`;

    // Get countries from restcountries.com
    axios
      .get(url)
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);

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
                <h2 className={s.heading}>Create your Crassula account</h2>

                {/* Name field */}
                <div className={s.field_wrapper}>
                  <label htmlFor="name">Your name: (Use latin alphabets)</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    required
                    value={fields.name}
                    onChange={updateField}
                    pattern="[a-zA-Z]+"
                    minLength={2}
                    maxLength={10}
                  />
                </div>
                {/* Surname field */}
                <div className={s.field_wrapper}>
                  <label htmlFor="surname">
                    Your surname: (Use latin alphabets)
                  </label>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname*"
                    required
                    value={fields.surname}
                    onChange={updateField}
                    pattern="[a-zA-Z]+"
                    minLength={2}
                    maxLength={10}
                  />
                </div>

                {/* Email field */}
                <div className={s.field_wrapper}>
                  <label htmlFor="email">Your email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    required
                    value={fields.email}
                    onChange={updateField}
                  />
                </div>
                {/* Password field */}
                <div className={s.field_wrapper}>
                  <label htmlFor="password">
                    Your password: (Minimum eight characters, at least one
                    letter, one number and one special character)
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password*"
                    required
                    value={fields.password}
                    onChange={updateField}
                    minLength={8}
                    pattern="^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                  />
                </div>
                {/* Phone number */}
                <div className={s.field_wrapper}>
                  <label htmlFor="phone">Your phone: (Use digits)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder=""
                    required
                    value={fields.phone}
                    onChange={updateField}
                    className={s.phone_field}
                    pattern="^\d+$"
                    minLength={3}
                    maxLength={13}
                  />
                  <div className={s.select_code}>
                    <span
                      className={s.active_code}
                      onClick={() => setCodeMenuActive(true)}
                    >
                      {activeCode}
                    </span>
                    <ul
                      className={`${s.codes_menu} ${
                        isCodeMenuActive ? s.active : ""
                      }`}
                    >
                      {countries?.map((country: Country) => (
                        <li
                          key={country.code}
                          onClick={() => {
                            setActiveCode(country.dial_code);
                            setCodeMenuActive(false);
                          }}
                        >
                          <strong>{country.dial_code}</strong>
                          <span>{country.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                {errorMsg && <p className={s.error_message}>{errorMsg}</p>}
                <button type="submit" className={s.button}>
                  Next Step
                </button>
              </form>
            </div>

            {/* Step 2 - Terms and conditions */}
            <div className={`${s.step} ${activeStep === 1 ? s.show : ""}`}>
              <form className={s.terms_form} onSubmit={handleTermsForm}>
                <h2 className={s.heading}>Terms & Conditions</h2>
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

            {/* Step 3 - Ask Verification */}
            <div className={`${s.step} ${activeStep === 2 ? s.show : ""}`}>
              <div className={s.verify_email}>
                <h2 className={s.heading}>
                  You have to confirm your email address. Please check your
                  email account.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
