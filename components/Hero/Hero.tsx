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
  const [isUserAuthorized, setUserAuthorized] = useState(true);

  const { locale } = useRouter();
  const t = translations[locale as keyof Locales];

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage) {
      setUserAuthorized(true);
    }
  }, []);

  const renderButton = (path: string, text: string) => (
    <Link href={path} className={`${s.button} button`}>
      {text}
    </Link>
  );

  return (
    <section className={s.hero}>
      <div className={`container ${s.content}`}>
        <div className={s.left_col}>
          <h1 className={s.heading}>{page["heroHeading"]}</h1>
          {isUserAuthorized
            ? renderButton("/profile", t["see_profile"])
            : renderButton("/register", t["get_started"])}
        </div>
        <div className={s.right_col}>
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
