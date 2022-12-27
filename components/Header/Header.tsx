import s from "./Header.module.scss";
import Link from "next/link";

type Props = {
  isHome?: boolean;
};

export default function Header({ isHome }: Props) {
  return (
    <header className={`${s.header} ${isHome ? "header-absolute" : ""} `}>
      <div className={`container ${s.wrapper}`}>
        {/* Logo */}
        <Link className={s.logo} href="/">
          <img src="/logo.png" alt="Tree of Money" />
          <span>CrassulaPay</span>
        </Link>
        {/* Navigation */}
        <ul className={s.navbar}>
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
