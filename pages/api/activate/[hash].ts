// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

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
  const { hash } = req.query;

  // See All pending users
  const pUsers = JSON.parse(
    fs.readFileSync("database/pending-users.json", "utf8")
  );

  // See registered users
  const rUsers = JSON.parse(fs.readFileSync("database/users.json", "utf8"));

  // See current user
  const cUser = pUsers.find((user: User) => user.id === hash);

  // Return all pending users without current pending user
  const resetPendingUsers = pUsers.filter((user: User) => user.id !== hash);
  fs.writeFileSync(
    `database/pending-users.json`,
    JSON.stringify(resetPendingUsers)
  );

  // Add activated user to registered users database
  rUsers.push(cUser);
  fs.writeFileSync(`database/users.json`, JSON.stringify(rUsers));

  res.status(200).json({ status: "good" });
}
