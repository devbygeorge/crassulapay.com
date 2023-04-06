import nodemailer from "nodemailer";

/* Send welcome email to newly registered users */
export const sendConfirmationEmail = ({ toUser, hash }: any) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const message = {
      from: process.env.GOOGLE_USER,
      to: toUser.email,
      subject: "Welcome - Crassula",
      html: `
        <h3>Hello ${toUser.name}</h3>
        <p>Thank you for registering into Crassula.</p>
      `,
    };

    transporter.sendMail(message, (err, info) => (err ? rej(err) : res(info)));
  });
};
