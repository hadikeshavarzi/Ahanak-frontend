import { Category } from "@/types/category";
import { Countdown } from "@/types/countdown";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

import imageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import { unstable_cache as cache } from "next/cache";

import clientConfig from "./config/client-config";
import {
  allCategoriesQuery,
  allProductsQuery,
  categoryByIdQuery,
  countdownQuery,
  heroBannerQuery,
  heroSliderQuery,
  orderByIdQuery,
  orderData,
  productData,
} from "./queries/shop-queries";

import { sanityFetch } from "./sanity-utils";

// ----------------------------
// 🟩 ساخت Sanity Client
// ----------------------------

const client = createClient(clientConfig);

// ----------------------------
// 🟩 ساخت image builder – حل خطای Vercel
// ----------------------------

const builder = imageUrlBuilder(client);

export function imageBuilder(source: any) {
  return builder.image(source);
}

// ----------------------------
// 🟩 Queries
// ----------------------------

export async function getCategories() {
  return sanityFetch<Category[]>({
    query: allCategoriesQuery,
    qParams: {},
    tags: ["category"],
    revalidate: 3600,
  });
}

export async function getCategoryBySlug(slug: string) {
  return sanityFetch<Category>({
    query: allCategoriesQuery,
    qParams: { slug },
    tags: ["category"],
    revalidate: 3600,
  });
}

export async function getCategoryById(id: string) {
  return sanityFetch<Category>({
    query: categoryByIdQuery,
    qParams: { id },
    tags: ["category"],
    revalidate: 3600,
  });
}

export async function getAllProducts() {
  return sanityFetch<Product[]>({
    query: allProductsQuery,
    qParams: {},
    tags: ["product", "category"],
    revalidate: 3600,
  });
}

export const getProductsByFilter = cache(
    async (query: string, tags: string[]) => {
      const filterQuery = groq`${query} ${productData}`;

      return sanityFetch<Product[]>({
        query: filterQuery,
        qParams: {},
        tags,
        revalidate: 3600,
      });
    },
    ["filtered-products"],
    { tags: ["product"] }
);

export async function getAllProductsCount() {
  return client.fetch<number>(groq`count(*[_type == "product"])`, {}, {
    next: { revalidate: 3600 }
  });
}

export async function getProduct(slug: string) {
  return sanityFetch<Product>({
    query: groq`*[_type == "product" && slug.current == $slug] ${productData}[0]`,
    tags: ["product"],
    qParams: { slug },
    revalidate: 3600,
  });
}

export async function getHighestPrice() {
  return client.fetch<number>(
      groq`*[_type == "product"] | order(price desc)[0].price`,
      {},
      {
        next: { revalidate: 3600 }
      }
  );
}

export async function getOrders(query: string) {
  const orderQuery = groq`*[_type == "order" ${query}] | order(_createdAt desc) ${orderData}`;

  return sanityFetch<Order[]>({
    query: orderQuery,
    qParams: {},
    tags: ["order"],
    revalidate: 3600,
  });
}

export async function getOrderById(orderId: string) {
  return sanityFetch<Order>({
    query: orderByIdQuery,
    qParams: { orderId },
    tags: ["order"],
    revalidate: 3600,
  });
}

// ----------------------------
// 🟩 Hero Banners
// ----------------------------

export const getHeroBanners = cache(
    async () =>
        sanityFetch<any>({
          query: heroBannerQuery,
          qParams: {},
          tags: ["heroBanner"],
          revalidate: 3600,
        }),
    ["hero-banners"],
    { tags: ["heroBanner"] }
);

export const getHeroSliders = cache(
    async () =>
        sanityFetch<any>({
          query: heroSliderQuery,
          qParams: {},
          tags: ["heroSlider"],
          revalidate: 3600,
        }),
    ["hero-sliders"],
    { tags: ["heroSlider"] }
);

// ----------------------------
// 🟩 Coupons
// ----------------------------

export async function getCoupons() {
  return client.fetch(
      groq`*[_type == "coupon"] {
      _id,
      name,
      code,
      discount,
      maxRedemptions,
      timesRedemed
    }`,
      {},
      {
        next: { revalidate: 3600 }
      }
  );
}

// ----------------------------
// 🟩 Countdown
// ----------------------------

export async function getCountdown() {
  return sanityFetch<Countdown>({
    query: countdownQuery,
    qParams: {},
    tags: ["countdown"],
    revalidate: 3600,
  });
}