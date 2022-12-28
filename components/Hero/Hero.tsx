import Link from "next/link";
import s from "./Hero.module.scss";

type Props = {
  isHome?: boolean;
};

export default function Hero({ isHome }: Props) {
  return (
    <section className={`${s.hero} ${isHome ? "hero-space" : ""} `}>
      <div className={`container ${s.wrapper}`}>
        <div className={s.text}>
          <h1 className={s.heading}>
            The cheap, fast way to send money abroad.
          </h1>
          <Link href="/register" className={`${s.button} button`}>
            Get Started
          </Link>
        </div>
        <div className={s.image}>
          <img src="/images/hero-2.png" alt="tree of money" />
        </div>
      </div>
    </section>
  );
}
