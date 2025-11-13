import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen py-20 px-8 bg-zinc-50 dark:bg-black">
            <div className="max-w-3xl mx-auto">
                <BlogListWithFilters posts={posts} />
            </div>
        </main>
    );
}
