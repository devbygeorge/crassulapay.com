import Image from "next/image";

import { UseCase } from "typings";

import s from "./UseCases.module.scss";
import { urlFor } from "../../sanity";

type Props = {
  useCases: UseCase[];
};

export default function UseCases({ useCases }: Props) {
  const renderBlockText = ({ title, description }: UseCase) => (
    <div className={s.block_text}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );

  const renderBlockImage = ({ image }: UseCase) => (
    <div className={s.block_image}>
      <Image
        src={urlFor(image)}
        alt="Use Case image from database"
        quality={100}
        fill
      />
    </div>
  );

  return (
    <section className={s.use_cases}>
      {useCases?.map((item, index) => (
        <div key={item["_id"]} className={s.block}>
          {index % 2 == 0 ? (
            <>
              {renderBlockText(item)}
              {renderBlockImage(item)}
            </>
          ) : (
            <>
              {renderBlockImage(item)}
              {renderBlockText(item)}
            </>
          )}
        </div>
      ))}
    </section>
  );
}
