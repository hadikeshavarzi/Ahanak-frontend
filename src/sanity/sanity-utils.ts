import { createClient, QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";

export const client = createClient(clientConfig);

export async function sanityFetch<QueryResponse>({
                                                     query,
                                                     qParams,
                                                     tags,
                                                     revalidate = 3600, // پیش‌فرض: هر 1 ساعت
                                                 }: {
    query: string;
    qParams: QueryParams;
    tags: string[];
    revalidate?: number | false;
}) {
    const cacheConfig = process.env.SANITY_HOOK_SECRET
        ? {
            cache: "force-cache" as const,
            next: {
                tags,
                revalidate, // حتماً اینجا revalidate استفاده میشه
            },
        }
        : {
            cache: "no-cache" as const,
            next: { tags },
        };

    return client.fetch<QueryResponse>(query, qParams, cacheConfig);
}