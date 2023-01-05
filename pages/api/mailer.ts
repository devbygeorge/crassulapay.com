import nodemailer from "nodemailer";

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
      to: "giopasieshvili2@gmail.com" || toUser.email,
      subject: "CrassulaPay - Activate Account",
      html: `
        <h3>Hello ${toUser.name}</h3>
        <p>Thank you for registering into CrassulaPay.</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/${hash}">Activate Link</a>.</p>
      `,
    };

    transporter.sendMail(message, (err, info) => (err ? rej(err) : res(info)));
  });
};
