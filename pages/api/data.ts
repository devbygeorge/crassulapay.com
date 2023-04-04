// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, groq } from "next-sanity";

import { MiniCase, Page, UseCase } from "typings";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2022-11-16",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_TOKEN,
};

const sanityClient = createClient(config);

type Data = {
  page: Page;
  miniCases: MiniCase[];
  useCases: UseCase[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { locale } = JSON.parse(req.body);

  const pageQuery = groq`
      *[_type == "page"][0] {
        "heroHeading": heroHeading.${locale},
        "heroImage": heroImage,
        "noFeesTitle": noFeesTitle.${locale},
        "noFeesDescription": noFeesDescription.${locale}
      }
    `;

  const miniCasesQuery = groq`
    *[_type == "miniCase"] | order(lower(name) asc) {
      "_id": _id,
      "title": title.${locale},
      "description": description.${locale},
      "image": image
    }
  `;

  const useCasesQuery = groq`
  *[_type == "useCase"] | order(lower(name) asc) {
    "_id": _id,
    "title": title.${locale},
    "description": description.${locale},
    "image": image
  }
`;

  const page = await sanityClient.fetch(pageQuery);
  const miniCases = await sanityClient.fetch(miniCasesQuery);
  const useCases = await sanityClient.fetch(useCasesQuery);

  res.status(200).json({ page, miniCases, useCases });
}
