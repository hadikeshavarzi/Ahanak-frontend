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
import { createClient } from '@sanity/client';
import clientConfig from './config/client-config';

const serverClient = createClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: clientConfig.apiVersion,
  token: process.env.SANITY_PROJECT_API_TOKEN,
  useCdn: false,
  perspective: "published"
});

export const getPostCategories = () =>
    serverClient.fetch<Category[]>(postCategoryQuery);

export const getPostTags = () =>
    serverClient.fetch<any>(groq`*[_type == "post" && defined(tags)]{ tags }`);

export const getAuthorBySlug = (slug: string) =>
    serverClient.fetch(authorBySlugQuery, { slug });

export const getPosts = () =>
    serverClient.fetch<Blog[]>(postQuery);

export const getPostsByLimit = (limit: number) =>
    serverClient.fetch<Blog[]>(`${postQuery}[0...${limit}]`);

export const getPostsByAuthorSlug = (authorSlug: string) =>
    serverClient.fetch<Blog[]>(
        groq`*[_type == "post" && author->slug.current == $authorSlug] ${postQuery}`,
        { authorSlug }
    );

export const getPostsByCategoryOrTag = (slug: string) =>
    serverClient.fetch<Blog[]>(
        groq`*[_type == "post" && postCategory->slug.current == $slug] ${postData}`,
        { slug }
    );

export const getCategoryBySlug = (slug: string) =>
    serverClient.fetch<Category>(categoryBySlugQuery, { slug });

export const getPost = (slug: string) =>
    serverClient.fetch<Blog>(postBySlugQuery, { slug });
