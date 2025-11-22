import { Blog } from "@/types/blogItem";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import config from "@/sanity/config/client-config"; // ❗ مهم
import Image from "next/image";

// Lazy-loaded image component
const SampleImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);

    const imageUrl = urlBuilder(config)
        .image(value)
        .fit("max")
        .auto("format")
        .url();

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

const RenderBodyContent = ({ post }: { post: Blog }) => {
    return (
        <div className="prose prose-lg max-w-none">
            <PortableText value={post?.body || []} components={components} />
        </div>
    );
};

export default RenderBodyContent;
