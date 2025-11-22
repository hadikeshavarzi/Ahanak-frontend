import { structuredAlgoliaHtmlData } from "@/algolia/crawlIndex";
import ShopDetails from "@/components/ShopDetails";
import {
  getAllProducts,
  getProduct,
  imageBuilder,
} from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

// -----------------------------
// Generate static paths
// -----------------------------
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product?.slug?.current,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

// -----------------------------
// Metadata with Safe Fallbacks
// -----------------------------
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
  const placeholder = "/placeholder.png";

  if (!product) {
    return {
      title: "Not Found",
      description: "No product found",
    };
  }

  const previewImageUrl = product?.previewImages?.[0]?.image
      ? imageBuilder(product.previewImages[0].image).url()
      : placeholder;

  return {
    title: `${product?.name || "Single Product Page"} | Ahanak`,
    description: `${product?.shortDescription?.slice(0, 150) || ""}...`,

    openGraph: {
      title: `${product?.name} | Ahanak`,
      description: product?.shortDescription,
      url: `${siteURL}/products/${product?.slug?.current}`,
      siteName: "Ahanak",
      images: [
        {
          url: previewImageUrl,
          width: 1800,
          height: 1600,
          alt: product?.name,
        },
      ],
      locale: "fa_IR",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: `${product?.name} | Ahanak`,
      description: `${product?.shortDescription?.slice(0, 150) || ""}...`,
      images: [previewImageUrl],
    },
  };
}

// -----------------------------
// Page Component (Safe)
// -----------------------------
const ProductDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const previewImageUrl = product?.previewImages?.[0]?.image
      ? imageBuilder(product.previewImages[0].image).url()
      : "";

  await structuredAlgoliaHtmlData({
    type: "products",
    title: product?.name,
    htmlString: product?.shortDescription || "",
    pageUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product?.slug?.current}`,
    imageURL: previewImageUrl || "",
    price: product?.price,
    discountedPrice: product?.discountedPrice,
    reviews: product?.reviews?.length || 0,
    category: product?.category ?? undefined,
    colors: product?.colors || [],
    sizes: product?.sizes || [],
    _id: product?._id,
    thumbnails: product?.thumbnails || [],
    status: product?.status,
    previewImages: product?.previewImages || [],
  });

  return (
      <main>
        <ShopDetails product={product} />
      </main>
  );
};

export default ProductDetails;
