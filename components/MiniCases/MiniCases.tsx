import Image from "next/image";

import { MiniCase } from "typings";

import s from "./MiniCases.module.scss";
import { urlFor } from "../../sanity";

type Props = {
  miniCases: MiniCase[];
};

export default function MiniCases({ miniCases }: Props) {
  return (
    <section className={s.mini_cases}>
      <div className={`container ${s.wrapper}`}>
        {miniCases?.map((item) => (
          <div key={item["_id"]} className={s.item}>
            <div className={s.image}>
              <Image
                src={urlFor(item["image"])}
                alt="Mini Case image from database"
                quality={100}
                fill
              />
            </div>
            <h2>{item["title"]}</h2>
            <p>{item["description"]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
