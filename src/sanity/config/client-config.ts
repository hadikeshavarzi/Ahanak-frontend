import { type ClientConfig } from "next-sanity";

const config: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-03-09",
  useCdn: true,
  token: process.env.SANITY_PROJECT_API_TOKEN, // لازم نیست ! بگذاری
  perspective: "published",
};

export default config;