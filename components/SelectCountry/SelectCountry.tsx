import { useState } from "react";

import codes from "./codes.json";
import s from "./SelectCountry.module.scss";

type Props = {
  currentPhoneCode: string;
  setCurrentPhoneCode: Function;
};

export default function SelectCountry({
  currentPhoneCode,
  setCurrentPhoneCode,
}: Props) {
  const [isMenuActive, setMenuActive] = useState(false);

  return (
    <div
      className={s.select_country}
      onClick={() => setMenuActive((state) => !state)}
    >
      <span className={s.current_code}>{currentPhoneCode}</span>
      <ul className={s.codes_menu} data-visible={isMenuActive ? true : false}>
        {codes?.map(({ name, code, country_code }) => (
          <li
            key={country_code}
            onClick={() => {
              setCurrentPhoneCode(code);
            }}
          >
            <strong>{code}</strong>
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
