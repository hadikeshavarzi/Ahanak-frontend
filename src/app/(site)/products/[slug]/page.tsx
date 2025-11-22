import ShopDetails from "@/components/ShopDetails";
import { getAllProducts, getProduct, imageBuilder } from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return (
      products
          ?.filter((p) => p?.slug?.current)
          ?.map((p) => ({
            slug: p.slug!.current,
          })) ?? []
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!product) {
    return {
      title: "Not Found",
      description: "Product not found",
    };
  }

  const previewImg =
      product?.previewImages?.[0]?.image
          ? imageBuilder(product.previewImages[0].image).url()
          : "/placeholder.png";

  return {
    title: product.name,
    description: product.shortDescription ?? "",
    alternates: {
      canonical: `${siteURL}/products/${product.slug?.current ?? ""}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [previewImg],
    },
    twitter: {
      card: "summary_large_image",
      images: [previewImg],
    },
  };
}

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
