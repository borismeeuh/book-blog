import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const posts = getAllPosts(lang);

    return (
        <div className="max-w-3xl mx-auto">
            <BlogListWithFilters
                lang={lang}
                posts={posts}
            />
        </div>
    );
}
