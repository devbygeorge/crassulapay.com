import Image from "next/image";

import { UseCase } from "typings";

import s from "./UseCases.module.scss";
import { urlFor } from "../../sanity";

type Props = {
  useCases: UseCase[];
};

export default function UseCases({ useCases }: Props) {
  const renderBlockText = ({ title, description }: UseCase) => (
    <div className={s.text}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.description}>{description}</p>
    </div>
  );

  const renderBlockImage = ({ image }: UseCase) => (
    <div className={s.image}>
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
      {useCases?.map((useCase, index) => (
        <div key={useCase["_id"]} className={s.use_case}>
          {index % 2 == 0 ? (
            <>
              {renderBlockText(useCase)}
              {renderBlockImage(useCase)}
            </>
          ) : (
            <>
              {renderBlockImage(useCase)}
              {renderBlockText(useCase)}
            </>
          )}
        </div>
      ))}
    </section>
  );
}
