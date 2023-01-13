import s from "./MiniCases.module.scss";
import { BiSupport } from "react-icons/bi";
import { AiFillBank } from "react-icons/ai";

export default function MiniCases() {
  return (
    <section className={s.mini_cases}>
      <div className="container">
        <div className={s.item}>
          <AiFillBank />
          <h2>Online Banking</h2>
          <p>
            We will provide personal online banking login details for your
            comfort and convenience.
          </p>
        </div>
        <div className={s.item}>
          <BiSupport />
          <h2>Supporting & Help.</h2>
          <p>
            Our site is provided with 24-hour live chat support as well as
            24-hour hotline support.
          </p>
        </div>
      </div>
    </section>
  );
}
