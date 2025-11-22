import ShopDetails from "@/components/ShopDetails";
import {
  getAllProducts,
  getProduct,
  imageBuilder,
} from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

// 🔥 اضافه کردن این خطوط
export const revalidate = 3600;
export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

export async function generateStaticParams() {
  const products = await getAllProducts();

  const validProducts = products.filter(
      (product) => product?.slug?.current
  );

  return validProducts.map((product) => ({
    slug: product.slug!.current,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!product || !product.slug?.current) {
    return {
      title: "محصول پیدا نشد",
      description: "این محصول وجود ندارد",
    };
  }

  const previewImg = product?.previewImages?.[0]?.image
      ? imageBuilder(product.previewImages[0].image).url()
      : "/placeholder.png";

  return {
    title: `${product.name} | فروشگاه آهنک`,
    description: product.shortDescription,
    alternates: {
      canonical: `${siteURL}/products/${product.slug.current}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `${siteURL}/products/${product.slug.current}`,
      images: [{ url: previewImg }],
    },
    twitter: {
      card: "summary_large_image",
      title: product?.name,
      description: product?.shortDescription,
      images: [previewImg],
    },
  };
}

const ProductDetails = async ({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product || !product.slug?.current) return notFound();

  return (
      <main>
        <ShopDetails product={product} />
      </main>
  );
};

export default ProductDetails;