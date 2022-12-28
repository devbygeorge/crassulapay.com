import Link from "next/link";
import { useState } from "react";
import s from "./Header.module.scss";

type Props = {
  isHome?: boolean;
};

export default function Header({ isHome }: Props) {
  const [isNavActive, setNavActive] = useState(false);

  return (
    <header
      className={`${s.header} ${isHome ? "header-absolute" : ""} ${
        isNavActive ? s.header_active : ""
      }`}
    >
      <div className={`container ${s.wrapper}`}>
        {/* Logo */}
        <Link className={s.logo} href="/">
          <img src="/logo.png" alt="Tree of Money" />
          <span>CrassulaPay</span>
        </Link>
        {/* Mobile Navbar Toggle */}
        <div
          className={`${s.toggle} ${isNavActive ? s.toggle_active : ""}`}
          onClick={() => setNavActive((state) => !state)}
        ></div>
        {/* Navigation */}
        <ul className={`${s.navbar} ${isNavActive ? s.navbar_active : ""}`}>
          <li className={s.item}>
            <Link href="/features">Features</Link>
          </li>
          <li className={s.item}>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className={s.item}>
            <Link href="/help">Help</Link>
          </li>
          <li className={s.item}>
            <Link href="/login">Login</Link>
          </li>
          <li className="button">
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
