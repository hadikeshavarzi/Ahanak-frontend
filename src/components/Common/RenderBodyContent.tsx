import { Blog } from "@/types/blogItem";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import config from "@/sanity/config/client-config";
import Image from "next/image";

// ---------------------------------------------
// 🔥 ساخت کلاینت رسمی Sanity فقط برای Image Builder
// ---------------------------------------------
const sanityClient = createClient({
    projectId: config.projectId!,
    dataset: config.dataset!,
    apiVersion: config.apiVersion,
    useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

const SampleImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);

    const imageUrl = builder.image(value).fit("max").auto("format").url();

    return (
        <Image
            src={imageUrl!}
            width={width}
            height={height}
            alt={value.alt || "blog image"}
            loading="lazy"
            style={{
                display: isInline ? "inline-block" : "block",
                aspectRatio: width / height,
            }}
        />
    );
};

const components = {
    types: {
        image: SampleImageComponent,
    },
};

export default function RenderBodyContent({ post }: { post: Blog }) {
    return (
        <div className="prose prose-lg max-w-none">
            <PortableText value={post?.body || []} components={components} />
        </div>
    );
}
