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
      <div className={`container ${s.content}`}>
        {miniCases?.map(({ _id, title, description, image }) => (
          <div key={_id} className={s.mini_case}>
            <div className={s.image}>
              <Image
                src={urlFor(image)}
                alt="Mini Case image from database"
                quality={100}
                fill
              />
            </div>
            <h2 className={s.title}>{title}</h2>
            <p className={s.description}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
