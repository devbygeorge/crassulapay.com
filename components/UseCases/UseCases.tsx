import s from "./UseCases.module.scss";

export default function UseCases() {
  return (
    <section className={s.use_cases}>
      {/* Block 1 */}
      <div className={s.block}>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Pay and bag with Crassula worldwide.</h2>
          {/* Block Paragraph */}
          <p>
            Crassula is the most convenient method to shop online. We gave a
            secure, reliable payment system that will keep your mind at peace.
            You can pay for most goods and services online except the prohibited
            items listed in the initial agreement.
          </p>
        </div>
        <div className={s.block_image}>
          <img src="/images/usecase-1.jpeg" alt="usecase 1" />
        </div>
      </div>
      {/* Block 2 */}
      <div className={s.block}>
        <div className={s.block_image}>
          <img src="/images/usecase-2.jpg" alt="usecase 2" />
        </div>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>How to get Crassula card?</h2>
          {/* Block Paragraph */}
          <p>
            Register securely with Crassula in order to receive a Crassula card
            by post at your home address. You need to go through the
            identification process. We require your selfie as well as proof of
            address, and a copy of your passport to be uploaded to our system
            for the identity verification process. You need to fill in the
            personal information questionnaire. Generated code will be sent to
            your phone number for additional verification. After successful
            verification, you will receive a verification confirmation letter as
            well as a welcome letter with your account details.
          </p>
        </div>
      </div>
      {/* Block 3 */}
      <div className={s.block}>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Keep your money with Crassula.</h2>
          {/* Block Paragraph */}
          <p>
            Transfer your money from your bank account to your Crassula account.
            Dollar and euro transfers are accepted. Keep your money with
            Crassula account free of charges (transfer fees are applied initial
            agreement) accordingly to.
          </p>
        </div>
        <div className={s.block_image}>
          <img src="/images/usecase-3.jpeg" alt="usecase 3" />
        </div>
      </div>
      {/* Block 4 */}
      <div className={s.block}>
        <div className={s.block_image}>
          <img src="/images/usecase-4.jpg" alt="usecase 4" />
        </div>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Paying methods.</h2>
          {/* Block Paragraph */}
          <p>
            You can pay securely with the touch and ping method as well as with
            the contactless payment method. The monthly limit for touch and ping
            and contactless payments will be applied accordingly to the initial
            agreement and Crassula's terms and conditions.
          </p>
        </div>
      </div>
      {/* Block 5 */}
      <div className={s.block}>
        <div className={s.block_text}>
          {/* Block Heading */}
          <h2>Transfer your money to another account and withdrawal.</h2>
          {/* Block Paragraph */}
          <p>
            Transfer the money from your Crassula to any other account worldwide
            a secure and convenient way (transfer fees applied accordingly to
            the initial agreement) monthly limit for the transfer will be
            applied. You can withdraw money from your Crassula card at any ATM
            worldwide supported by Visa or MasterCard. Daily and monthly limits
            of withdrawal will be applied accordingly to the initial agreement.
          </p>
        </div>
        <div className={s.block_image}>
          <img src="/images/usecase-5.jpg" alt="usecase 4" />
        </div>
      </div>
    </section>
  );
}
