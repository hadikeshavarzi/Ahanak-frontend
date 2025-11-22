import { createClient, QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";

export const client = createClient(clientConfig);

export async function sanityFetch<QueryResponse>({
                                                     query,
                                                     qParams,
                                                     tags,
                                                     revalidate = 3600,
                                                 }: {
    query: string;
    qParams: QueryParams;
    tags: string[];
    revalidate?: number | false;
}) {
    return client.fetch<QueryResponse>(query, qParams, {
        cache: "force-cache",
        next: {
            tags,
            revalidate,
        },
    });
}