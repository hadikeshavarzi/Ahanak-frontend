import { client } from "@/sanity/sanity-utils";
import { Blog } from "@/types/blogItem";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";

// Lazy Image Component
const SampleImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);

    const imageUrl = urlBuilder(client)
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
    return <PortableText value={post?.body || []} components={components} />;
};

export default RenderBodyContent;
