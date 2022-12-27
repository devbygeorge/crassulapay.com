import Link from "next/link";
import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.wrapper}`}>
        {/* Logo */}
        <Link className={s.logo} href="/">
          <img src="/logo.png" alt="Tree of Money" />
          <span>CrassulaPay</span>
        </Link>
      </div>
    </footer>
  );
}
