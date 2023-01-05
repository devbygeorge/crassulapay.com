import s from "./UseCases.module.scss";

export default function UseCases() {
  return (
    <section className={s.use_cases}>
      <div className={s.nofees}>
        <div className="container">
          <h3>No hidden fees.</h3>
          <p>
            We’re on a mission to bring transparency to finance, for people
            without borders. We charge as little as possible, and we always show
            you upfront. No hidden fees. No bad exchange rates. No surprises.
            How do we collect this data?
          </p>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Keep your money with Crassula.</h2>
          {/* Block Item 1 */}
          <h3>Receive your salary, pension, and more.</h3>
          <p>
            Relocate without the stress — and without the multiple bank
            accounts. Share your details with your employer, pension scheme,
            family or friends, and get paid like a local.
          </p>
          {/* Block Item 2 */}
          <h3>Spend in local currency with your card.</h3>
          <p>
            Avoid the bank appointments, and start spending as soon as you get
            there. You’ll always get the best possible exchange rate.
          </p>
          {/* Block Item 3 */}
          <h3>Move your money between countries.</h3>
          <p>
            Send money to 80 countries, always with a low and transparent fee.
            With Direct Debits in the UK, Europe, US and Canada, paying your
            bills and subscriptions across currencies is easier than ever.
          </p>
        </div>
        <div className={s.block_image}>
          <img src="/images/usecase-1.jpg" alt="usecase 1" />
        </div>
      </div>
      <div className={s.block}>
        <div className={s.block_image}>
          <img src="/images/usecase-2.jpg" alt="usecase 2" />
        </div>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Pay with crassula worldwide.</h2>
          {/* Block Item 1 */}
          <h3>Pay at the real exchange rate.</h3>
          <p>
            Avoid sneaky bank exchange rate markups and high foreign transaction
            fees. Pay only a low upfront conversion fee, and no annual card fee.
          </p>
          {/* Block Item 2 */}
          <h3>Always pay in the local currency.</h3>
          <p>
            If you’re shopping online, always choose to pay in the currency of
            the country you’re buying from. If you don’t have it in your
            account, the card will automatically convert to it from the account
            that’s cheapest for you. You’ll avoid Dynamic Currency Conversion
            fees.
          </p>
          {/* Block Item 3 */}
          <h3>Pay online securely with instant notifications.</h3>
          <p>
            Authorise payments with 3-D Secure authentication. Receive instant
            notifications when you spend.
          </p>
        </div>
      </div>
      <div className={s.block}>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Crassula makes life comfortable.</h2>
          {/* Block Item 1 */}
          <h3>Save when you buy property abroad.</h3>
          <p>
            Sending and managing money with CrassulaPay is on average 6x cheaper
            than UK banks. And with our tiered pricing for large amounts, you
            get an even lower fee on any transfers over 100,000 GBP or
            equivalent in your currency.
          </p>
          {/* Block Item 2 */}
          <h3>Pay your bills remotely.</h3>
          <p>
            Hold 52 currencies in one place. Easily manage your mortgage and
            utility bills across currencies with Direct Debit in the UK, Europe,
            US and Canada, and pay tradespeople like a local.
          </p>
          {/* Block Item 3 */}
          <h3>Receive payments from tenants.</h3>
          <p>
            Get paid in 9 currencies with your own account details. And when the
            rate is right, convert your money in seconds.
          </p>
        </div>
        <div className={s.block_image}>
          <img src="/images/usecase-4.jpeg" alt="usecase 3" />
        </div>
      </div>
    </section>
  );
}
