import axios from "axios";
import { useState, useEffect } from "react";
import s from "./UseCases.module.scss";

const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/use-cases?populate=*&sort[0]=order%3Aasc`;

type Block = {
  id: number;
  attributes: {
    title: string;
    description: string;
    order: number;
    reversed: boolean;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export default function UseCases() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setBlocks(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={s.use_cases}>
      {blocks?.map((block: Block) =>
        block.attributes.reversed ? (
          <div key={block.id} className={s.block}>
            <div className={s.block_image}>
              <img
                src={`${process.env.NEXT_PUBLIC_CMS_DOMAIN}${block.attributes.image.data.attributes.url}`}
                alt={block.attributes.title}
              />
            </div>
            <div className={s.block_text}>
              <h2>{block.attributes.title}</h2>
              <p>{block.attributes.description}</p>
            </div>
          </div>
        ) : (
          <div key={block.id} className={s.block}>
            <div className={s.block_text}>
              <h2>{block.attributes.title}</h2>
              <p>{block.attributes.description}</p>
            </div>
            <div className={s.block_image}>
              <img
                src={`${process.env.NEXT_PUBLIC_CMS_DOMAIN}${block.attributes.image.data.attributes.url}`}
                alt={block.attributes.title}
              />
            </div>
          </div>
        )
      )}
    </section>
  );
}
