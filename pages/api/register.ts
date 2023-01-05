// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { sendConfirmationEmail } from "./mailer";

type Data = {
  status: string;
};

type User = {
  id: string;
  name: string;
  surname: string;
  address: string;
  email: string;
  password: string;
  phone: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, surname, address, email, password, phone } = JSON.parse(
    req.body
  );
  
  // See pending users
  const pUsers = JSON.parse(
    fs.readFileSync("database/pending-users.json", "utf8")
  );
  // See registered users
  const rUsers = JSON.parse(fs.readFileSync("database/users.json", "utf8"));

  // Check if user is already registered or needs to be activated
  const pUser = pUsers.find((user: User) => user.email === email);
  const rUser = rUsers.find((user: User) => user.email === email);
  if (pUser) {
    return res
      .status(200)
      .json({ status: "User is pending, check your email" });
  }
  if (rUser) {
    return res.status(200).json({ status: "User is registered, please login" });
  }

  // Add user to pending users database
  const cUser = {
    id: uuidv4(),
    name: name,
    surname: surname,
    address: address,
    email: email,
    password: password,
    phone: phone,
  };
  pUsers.push(cUser);
  fs.writeFileSync(`database/pending-users.json`, JSON.stringify(pUsers));

  // Send activation link through email
  await sendConfirmationEmail({ toUser: cUser, hash: cUser.id });

  // res.status(200).json({ status: `User ${name} Registered` });
  res.status(200).json({ status: "good" });
}
