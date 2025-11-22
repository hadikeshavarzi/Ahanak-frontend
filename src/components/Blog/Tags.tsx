import { getPostTags } from "@/sanity/sanity-blog-utils";
import Link from "next/link";

interface PostTags {
    tags?: string[];
}

const Tags = async () => {
    const tagsData: PostTags[] = await getPostTags();

    // TypeScript-safe: اگر پست tags نداشت → [] برمی‌گرداند
    const uniqueTagsSet = new Set(
        tagsData.flatMap((post) => post?.tags ?? [])
    );

    const uniqueTagsArray = [...uniqueTagsSet];

    return (
        <div className="shadow-1 bg-white rounded-xl mt-7.5">
            <div className="px-4 sm:px-6 py-4.5 border-b border-gray-3">
                <h2 className="font-medium text-lg text-dark">Tags</h2>
            </div>

            <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-3.5">
                    {uniqueTagsArray.map((tag) => (
                        <Link
                            key={tag}
                            className="inline-flex hover:text-white border border-gray-3 py-2 h-10 text-base items-center justify-center px-4 rounded-full ease-out duration-200 hover:bg-blue hover:border-blue capitalize"
                            href={`/blogs/tags/${tag}`}
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tags;
