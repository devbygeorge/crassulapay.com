import Logo from "@/components/Logo";

import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.content}`}>
        <Logo />
        <div>&copy; Copyright 2023</div>
      </div>
    </footer>
  );
}
