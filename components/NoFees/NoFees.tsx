import s from "./NoFees.module.scss";

export default function NoFees() {
  return (
    <div className={s.no_fees}>
      <div className="container">
        <h3>No hidden fees.</h3>
        <p>
          We’re on a mission to bring transparency to finance, for people
          without borders. We charge as little as possible, and we always show
          you upfront. No hidden fees. No bad exchange rates. No surprises. How
          do we collect this data?
        </p>
      </div>
    </div>
  );
}
