import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
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

const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/hero?populate=*`;

export default function Hero({ isHome }: Props) {
  const [fetchedData, setFetchedData] = useState<null | FetchedData>(null);
  const [isAuthorized, setAuthorized] = useState(false);

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
              See Profile
            </Link>
          ) : (
            <Link href="/register" className={`${s.button} button`}>
              Get Started
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
