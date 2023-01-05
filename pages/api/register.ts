// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, surname, address, email, phone } = JSON.parse(req.body);
  console.log(name, surname, address, email, phone);
  res.status(200).json({ status: `User ${name} Registered` });
}
