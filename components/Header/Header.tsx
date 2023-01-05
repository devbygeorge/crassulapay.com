import Link from "next/link";
import { useState, useEffect } from "react";
import s from "./Header.module.scss";

type Props = {
  isHome?: boolean;
};

type User = {
  id: string;
  name: string;
  surname: string;
  address: string;
  email: string;
  password: string;
  phone: string;
};

export default function Header({ isHome }: Props) {
  const [isNavActive, setNavActive] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setAuthorizedUser(JSON.parse(localUser));
    } else {
      setAuthorizedUser(null);
    }
  }, []);

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
          {authorizedUser ? (
            <>
              <li>
                <Link href="/profile">Welcome {authorizedUser.name}</Link>
              </li>
              <li className="button">
                <Link href="#">Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li className={s.item}>
                <Link href="/register">Register</Link>
              </li>
              <li className="button">
                <Link href="/login">Log in</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
