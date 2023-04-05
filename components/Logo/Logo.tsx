import Image from "next/image";
import Link from "next/link";

import s from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link href="/" className={s.logo}>
      <Image src="/logo.png" alt="Tree of Money" width={50} height={50} />
      <span>Crassula</span>
    </Link>
  );
}
