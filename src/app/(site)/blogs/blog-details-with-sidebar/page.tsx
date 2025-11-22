import BlogDetailsWithSidebar from '@/components/BlogDetailsWithSidebar';
import { getPost } from '@/sanity/sanity-blog-utils';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; // ✅ این خط رو اضافه کنید

export const metadata: Metadata = {
  title: 'Blog Details Page | NextMerce | Next.js E-commerce Boilerplate',
  description: 'This is Blog Details Page for NextMerce Template',
};

const BlogDetailsWithSidebarPage = async () => {
  const slug = 'cooking-masterclass-creating-delicious-italian-pasta';

  const blogData = await getPost(slug);

  // ✅ چک کنید که blogData وجود داره
  if (!blogData) {
    return (
        <main>
          <div className="text-center py-20">
            <p className="text-2xl">Blog post not found!</p>
          </div>
        </main>
    );
  }

  return (
      <main>
        <BlogDetailsWithSidebar blogData={blogData} />
      </main>
  );
};

export default BlogDetailsWithSidebarPage;
