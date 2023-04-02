/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbWorld } from "react-icons/tb";

import { en, ka, ru } from "translations";

import s from "./Header.module.scss";


type Props = {
  isHome?: boolean;
};

type User = {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
};

type Category = {
  id: number;
  attributes: {
    title: string;
    url: string;
  };
};

export default function Header({ isHome }: Props) {
  const [isNavActive, setNavActive] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);
  const [categories, setCategiries] = useState([]);
  const [isLanguageMenuActive, setLanguageMenuActive] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const t = locale === "ru" ? ru : locale === "ka" ? ka : en;
  const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/categories?populate=*&locale=${locale}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setCategiries(res.data.data))
      .catch((err) => console.log(err));

    const localUser = localStorage.getItem("user");
    if (localUser) {
      setAuthorizedUser(JSON.parse(localUser).user);
    } else {
      setAuthorizedUser(null);
    }
  }, [url]);

  return (
    <header
      className={`${s.header} ${isHome ? "header-absolute" : ""} ${
        isNavActive ? s.active : ""
      }`}
    >
      <div className={`container ${s.wrapper}`}>
        {/* Logo */}
        <Link className={s.logo} href="/">
          <img src="/logo.png" alt="Tree of Money" />
          <span>Crassula</span>
        </Link>

        {/* Mobile navbar toggle */}
        <div
          className={`${s.toggle} ${isNavActive ? s.toggle_active : ""}`}
          onClick={() => setNavActive((state) => !state)}
        ></div>

        {/* Navigation */}
        <ul className={`${s.navbar} ${isNavActive ? s.navbar_active : ""}`}>
          {/* Render categories from strapi */}
          {categories?.map((category: Category) => (
            <li key={category.id} className={s.item}>
              <Link href={category.attributes.url}>
                {category.attributes.title}
              </Link>
            </li>
          ))}

          {/* Render language change options */}
          <div
            className={s.langs_wrapper}
            onClick={() => setLanguageMenuActive((state) => !state)}
          >
            <div className={s.langs_display}>
              <TbWorld />
              <span>{locale}</span>
            </div>

            <ul
              className={`${s.langs_menu} ${
                isLanguageMenuActive ? s.active : ""
              }`}
            >
              <li className={s.langs_item}>
                <a href="/en">{t.english}</a>
              </li>
              <li className={s.langs_item}>
                <a href="/ru">{t.russian}</a>
              </li>
              <li className={s.langs_item}>
                <a href="/ka">{t.georgian}</a>
              </li>
            </ul>
          </div>

          {/* Render buttons according to authorization */}
          {authorizedUser ? (
            <>
              <li>
                <Link href="/profile">
                  {t.welcome} {authorizedUser.name}
                </Link>
              </li>
              <li className="button">
                <Link
                  href="/"
                  onClick={() => {
                    localStorage.clear();
                    setAuthorizedUser(null);
                  }}
                >
                  {t.logout}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={s.item}>
                <Link href="/register">{t.register}</Link>
              </li>
              <li className="button">
                <Link href="/login">{t.login}</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
