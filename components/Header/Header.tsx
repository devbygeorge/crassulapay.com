/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { TbWorld } from "react-icons/tb";

import Logo from "@/components/Logo";
import translations from "translations";
import { Locales } from "typings";

import s from "./Header.module.scss";

const navbarItems = [
  {
    name: "features",
    path: "/#",
  },
  {
    name: "pricing",
    path: "/#",
  },
  {
    name: "help",
    path: "/#",
  },
];

const locales = [
  {
    name: "english",
    code: "en",
  },
  {
    name: "russian",
    code: "ru",
  },
  {
    name: "georgian",
    code: "ka",
  },
];

type Props = {
  transparent?: boolean;
};

export default function Header({ transparent }: Props) {
  const [isNavbarActive, setNavbarActive] = useState(false);
  const [isLocalesMenuActive, setLocalesMenuActive] = useState(false);
  const [user, setUser] = useState(null);

  const { locale } = useRouter();
  const t = translations[locale as keyof Locales];

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  return (
    <header
      className={s.header}
      data-transparent={transparent ? true : false}
      data-visible-mobile={isNavbarActive ? true : false}
    >
      <div className={`container ${s.content}`}>
        {/* Logo */}
        <Logo />

        {/* Navbar Toggle */}
        <button
          className={s.toggle}
          aria-expanded={isNavbarActive ? true : false}
          onClick={() => setNavbarActive((state) => !state)}
        ></button>

        {/* Navbar */}
        <nav
          className={s.navbar}
          data-visible-mobile={isNavbarActive ? true : false}
        >
          {/* Navbar Items */}
          {navbarItems.map(({ name, path }) => (
            <Link key={name} href={path} className={s.navbar_item}>
              {t[name as keyof typeof t]}
            </Link>
          ))}

          {/* Locales */}
          <div className={s.locales_container}>
            <div
              className={s.current_locale}
              onClick={() => setLocalesMenuActive((state) => !state)}
            >
              <TbWorld />
              <span>{locale}</span>
            </div>

            <div
              className={s.locales}
              data-visible-mobile={isLocalesMenuActive ? true : false}
            >
              {locales.map(({ name, code }) => (
                <Link
                  href=""
                  key={name}
                  locale={code}
                  className={s.locale_item}
                  onClick={() => setLocalesMenuActive(false)}
                >
                  {t[name as keyof typeof t]}
                </Link>
              ))}
            </div>
          </div>

          {/* Render profile & logout or login & register buttons */}
          {user ? (
            <>
              <Link href="/profile">
                {t["welcome"]} {user["name"]}
              </Link>

              <Link
                href="/"
                onClick={() => {
                  localStorage.clear();
                  setUser(null);
                }}
                className="button"
              >
                {t["logout"]}
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className={s.navbar_item}>
                {t["register"]}
              </Link>

              <Link href="/login" className="button">
                {t["login"]}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
