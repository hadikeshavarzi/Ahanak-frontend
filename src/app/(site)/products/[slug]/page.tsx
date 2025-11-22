import ShopDetails from "@/components/ShopDetails";
import { getAllProducts, getProduct, imageBuilder } from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // مهم برای اینکه runtime dynamic error ندهد

// ---------------------------
// Build-Time Static Params
// ---------------------------
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products
      .filter((p) => p?.slug?.current)
      .map((product) => ({
        slug: product.slug.current,
      }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// ---------------------------
// SEO Metadata (Safe Version)
// ---------------------------
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

  const canonicalSlug = product?.slug?.current || "";
  const previewImage =
      product?.previewImages?.[0]?.image
          ? imageBuilder(product.previewImages[0].image).url()
          : "/placeholder.png";

  return {
    title: `${product.name} | Ahanak`,
    description: product.shortDescription || "",
    alternates: {
      canonical: `${siteURL}/products/${canonicalSlug}`,
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
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [previewImage],
    },
  };
}

// ---------------------------
// Product Page
// ---------------------------
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
