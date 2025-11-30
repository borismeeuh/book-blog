import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const posts = getAllPosts(lang);

    return (
        <main className="min-h-screen py-20 px-8 bg-zinc-50 dark:bg-black">
            <div className="max-w-3xl mx-auto">
                <BlogListWithFilters
                    lang={lang}
                    posts={posts}
                />
            </div>
        </main>
    );
}
