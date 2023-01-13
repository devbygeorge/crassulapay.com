import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./MiniCases.module.scss";

type Item = {
  id: number;
  attributes: {
    title: string;
    description: string;
    order: number;
    icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export default function MiniCases() {
  const [items, setItems] = useState([]);

  const router = useRouter();
  const { locale } = router;
  const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/mini-cases?populate=*&sort[0]=order%3Aasc&locale=${locale}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setItems(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={s.mini_cases}>
      <div className={`container ${s.wrapper}`}>
        {items?.map((item: Item) => (
          <div key={item.id} className={s.item}>
            <img
              src={`${process.env.NEXT_PUBLIC_CMS_DOMAIN}${item.attributes.icon.data.attributes.url}`}
              alt={item.attributes.title}
            />
            <h2>{item.attributes.title}</h2>
            <p>{item.attributes.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
