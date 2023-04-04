import { Page } from "typings";

import s from "./NoFees.module.scss";

type Props = {
  page: Page;
};

export default function NoFees({ page }: Props) {
  return (
    <div className={s.no_fees}>
      <div className="container">
        <h3>{page["noFeesTitle"]}</h3>
        <p>{page["noFeesDescription"]}</p>
      </div>
    </div>
  );
}
