import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { en, ru, ka } from "translations";
import s from "./Hero.module.scss";

type Props = {
  isHome?: boolean;
};

type FetchedData = {
  title: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
};

export default function Hero({ isHome }: Props) {
  const [fetchedData, setFetchedData] = useState<null | FetchedData>(null);
  const [isAuthorized, setAuthorized] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const t = locale === "ru" ? ru : locale === "ka" ? ka : en;
  const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/hero?populate=*&locale=${locale}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setFetchedData(res.data.data.attributes))
      .catch((err) => console.log(err));

    const isAuth = localStorage.getItem("user");
    if (isAuth) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  return (
    <section className={`${s.hero} ${isHome ? "hero-space" : ""} `}>
      <div className={`container ${s.wrapper}`}>
        <div className={s.text}>
          <h1 className={s.heading}>{fetchedData?.title}</h1>
          {isAuthorized ? (
            <Link href="/profile" className={`${s.button} button`}>
              {t.see_profile}
            </Link>
          ) : (
            <Link href="/register" className={`${s.button} button`}>
              {t.get_started}
            </Link>
          )}
        </div>
        <div className={s.image}>
          <img src="/images/hero-img.png" alt="tree of money" />
        </div>
      </div>
    </section>
  );
}
