import { useState, useEffect } from "react";
import Link from "next/link";
import s from "./Hero.module.scss";

type Props = {
  isHome?: boolean;
};

export default function Hero({ isHome }: Props) {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
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
          <h1 className={s.heading}>
            Most reliable, convenient paying method.
          </h1>
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
          <img src="/images/hero-2.png" alt="tree of money" />
        </div>
      </div>
    </section>
  );
}
