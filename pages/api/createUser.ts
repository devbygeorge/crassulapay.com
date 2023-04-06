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
  const userBody = {
    _type: "webUser",
    ...req.body,
  };

  const emailQuery = groq`
      *[_type == "webUser" && email == "${userBody.email}"]
    `;

  const phoneQuery = groq`
      *[_type == "webUser" && phone == "${userBody.phone}"]
    `;

  const userWithSameEmail = await sanityClient.fetch(emailQuery);
  const userWithSamePhone = await sanityClient.fetch(phoneQuery);

  let statusCode = 200;
  let message = "success";

  if (userWithSameEmail.length != 0) {
    statusCode = 403;
    message = "Email is already in use";
  }

  if (userWithSamePhone.length != 0) {
    statusCode = 403;
    message = "Phone is already in use";
  }

  if (userWithSameEmail.length != 0 && userWithSamePhone.length != 0) {
    message = "Email and phone is already in use";
  }

  let user;

  if (statusCode === 200) {
    user = await sanityClient.create(userBody);
  }

  res.status(statusCode).json({ user, message });
}
