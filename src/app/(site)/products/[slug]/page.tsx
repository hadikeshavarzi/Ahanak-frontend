import ShopDetails from "@/components/ShopDetails";
import { getProduct, imageBuilder } from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

// صفحه کاملاً داینامیک
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

// -----------------
// META
// -----------------
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  if (!product) {
    return {
      title: "Product Not Found",
      description: "No product found",
    };
  }

  const previewImage =
      product?.previewImages?.[0]?.image
          ? imageBuilder(product.previewImages[0].image).url()
          : "/placeholder.png";

  return {
    title: `${product.name} | Ahanak`,
    description: product.shortDescription || "",
    alternates: {
      canonical: `${siteURL}/products/${product.slug.current}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [previewImage],
    },
  };
}

// -----------------
// PAGE
// -----------------
const ProductDetails = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) notFound();

  return (
      <main>
        <ShopDetails product={product} />
      </main>
  );
};

export default ProductDetails;
