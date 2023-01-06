// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

type Data = {
  status: string;
  user?: User;
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
  const { email, password } = JSON.parse(req.body);

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
  if (rUser && rUser.password === password) {
    return res
      .status(200)
      .json({ status: "Success Login, Welcome to Crassula", user: rUser });
  } else if (rUser) {
    return res.status(200).json({ status: "Please use correct password" });
  } else {
    return res.status(200).json({ status: "Please use correct email" });
  }
}
