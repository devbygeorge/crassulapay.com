import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import translations from "translations";
import { Locales, Page } from "typings";

import s from "./Hero.module.scss";
import { urlFor } from "../../sanity";

type Props = {
  page: Page;
};

export default function Hero({ page }: Props) {
  const [isAuthorized, setAuthorized] = useState(false);

  const { locale } = useRouter();
  const t = translations[locale as keyof Locales];

  useEffect(() => {
    const isAuth = localStorage.getItem("user");
    if (isAuth) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  return (
    <section className={s.hero}>
      <div className={`container ${s.wrapper}`}>
        <div className={s.text}>
          <h1 className={s.heading}>{page["heroHeading"]}</h1>
          {isAuthorized ? (
            <Link href="/profile" className={`${s.button} button`}>
              {t["see_profile"]}
            </Link>
          ) : (
            <Link href="/register" className={`${s.button} button`}>
              {t["get_started"]}
            </Link>
          )}
        </div>
        <div className={s.image}>
          <Image
            src={urlFor(page["heroImage"])}
            alt="Hero image from database"
            quality={100}
            fill
          />
        </div>
      </div>
    </section>
  );
}
