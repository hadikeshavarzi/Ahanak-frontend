import { type ClientConfig } from "next-sanity"; 
const projectId =
  process.env.SANITY_PROJECT_ID || 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || 
  process.env.NEXT_PUBLIC_SANITY_DATASET || 
  "production";
const config: ClientConfig = { projectId, dataset, 
  apiVersion: "2023-03-09", useCdn: true, token: 
  process.env.SANITY_PROJECT_API_TOKEN, 
  perspective: "published",
};
export default config;
