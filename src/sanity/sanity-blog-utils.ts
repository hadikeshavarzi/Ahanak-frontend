import { Blog } from '@/types/blogItem';
import { Category } from '@/types/category';
import { groq } from 'next-sanity';
import {
  authorBySlugQuery,
  categoryBySlugQuery,
  postBySlugQuery,
  postCategoryQuery,
  postData,
  postQuery,
} from './queries/blog-queries';
import { sanityFetch } from './sanity-utils';
import { createClient } from '@sanity/client';
import clientConfig from './config/client-config';

// 🔥 Server-side client — با Token
const serverClient = createClient({
  projectId: clientConfig.projectId!,
  dataset: clientConfig.dataset!,
  apiVersion: clientConfig.apiVersion,
  token: process.env.SANITY_PROJECT_API_TOKEN,
  useCdn: false,
  perspective: "published",
});

export async function getPostCategories() {
  return serverClient.fetch<Category[]>(postCategoryQuery);
}

export async function getPostTags() {
  return serverClient.fetch<any>(
      groq`*[_type == "post" && defined(tags)]{ "tags": tags[] }`
  );
}

export async function getAuthorBySlug(slug: string) {
  return serverClient.fetch(authorBySlugQuery, { slug });
}

export async function getPosts() {
  return serverClient.fetch<Blog[]>(postQuery);
}

export async function getPostsByLimit(limit: number) {
  return serverClient.fetch<Blog[]>(postQuery + `[0...${limit}]`);
}

export async function getPostsByAuthorSlug(authorSlug: string) {
  return serverClient.fetch<Blog[]>(
      groq`*[_type == "post" && author->slug.current == $authorSlug] ${postQuery}`,
      { authorSlug }
  );
}

export async function getPostsByCategoryOrTag(slug: string) {
  return serverClient.fetch<Blog[]>(
      groq`*[_type == "post" && postCategory->slug.current == $slug] ${postData}`,
      { slug }
  );
}

export async function getCategoryBySlug(slug: string) {
  return serverClient.fetch<Category>(categoryBySlugQuery, { slug });
}

export async function getPost(slug: string) {
  return serverClient.fetch<Blog>(postBySlugQuery, { slug });
}
