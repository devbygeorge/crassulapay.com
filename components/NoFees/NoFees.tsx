import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import s from "./NoFees.module.scss";

type FetchedData = {
  title: string;
  description: string;
};

export default function NoFees() {
  const [fetchedData, setFetchedData] = useState<null | FetchedData>(null);

  const router = useRouter();
  const { locale } = router;
  const url = `${process.env.NEXT_PUBLIC_CMS_DOMAIN}/api/no-fee?populate=*&locale=${locale}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setFetchedData(res.data.data.attributes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={s.no_fees}>
      <div className="container">
        <h3>{fetchedData?.title}</h3>
        <p>{fetchedData?.description}</p>
      </div>
    </div>
  );
}
