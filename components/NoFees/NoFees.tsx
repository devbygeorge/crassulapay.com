import { Page } from "typings";

import s from "./NoFees.module.scss";

type Props = {
  page: Page;
};

export default function NoFees({ page }: Props) {
  return (
    <section className={s.no_fees}>
      <div className="container">
        <h3 className={s.title}>{page["noFeesTitle"]}</h3>
        <p className={s.description}>{page["noFeesDescription"]}</p>
      </div>
    </section>
  );
}
