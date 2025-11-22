import { structuredAlgoliaHtmlData } from "@/algolia/crawlIndex";
import ShopDetails from "@/components/ShopDetails";
import {
  getAllProducts,
  getProduct,
  imageBuilder,
} from "@/sanity/sanity-shop-utils";
import { notFound } from "next/navigation";

// ---------------------------
// Generate Static Params
// ---------------------------
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products
      .filter((p) => p?.slug?.current)
      .map((product) => ({
        slug: product.slug.current,
      }));
}

// ---------------------------
// Types
// ---------------------------
type Props = {
  params: Promise<{ slug: string }>;
};

// ---------------------------
// SEO Metadata
// ---------------------------
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "";

  if (!product) {
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

// ---------------------------
// Product Page Component
// ---------------------------
const ProductDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  const previewImg =
      product?.previewImages?.[0]?.image &&
      imageBuilder(product.previewImages[0].image).url();

  // ---------------------------
  // Structured Data for Algolia
  // ---------------------------
  await structuredAlgoliaHtmlData({
    type: "products",
    title: product?.name ?? "",
    htmlString: product?.shortDescription ?? "",
    pageUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product?.slug?.current}`,
    imageURL: previewImg ?? "",
    price: product?.price ?? undefined,
    discountedPrice: product?.discountedPrice ?? undefined,
    reviews: product?.reviews?.length ?? 0,

    // 🔥 مهم: null حذف شد، همیشه یا object یا undefined
    category: product?.category ?? undefined,

    colors: product?.colors ?? [],
    sizes: product?.sizes ?? [],
    _id: product?._id,
    thumbnails: product?.thumbnails ?? [],
    status: product?.status ?? true,
    previewImages: product?.previewImages ?? [],
  });

  return (
      <main>
        <ShopDetails product={product} />
      </main>
  );
};

export default ProductDetails;
