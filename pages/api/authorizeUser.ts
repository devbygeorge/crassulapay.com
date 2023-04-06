// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, groq } from "next-sanity";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2022-11-16",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_TOKEN,
};

const sanityClient = createClient(config);

type Data = {
  user: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  const userQuery = groq`
      *[_type == "webUser" && email == "${email}"]
    `;

  const users = await sanityClient.fetch(userQuery);

  let statusCode = 200;
  let message = "success";
  let user;

  if (users.length && users[0].password == password) {
    user = users[0];
  } else if (users.length) {
    statusCode = 403;
    message = "Password is not correct";
  } else {
    statusCode = 403;
    message = "Email is not correct";
  }

  res.status(statusCode).json({ user, message });
}
