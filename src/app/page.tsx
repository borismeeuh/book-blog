import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function HomePage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen py-20 px-8 bg-zinc-50 dark:bg-black">
            <section className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-center">Welkom!</h1>
                <BlogListWithFilters posts={posts} />
            </section>
        </main>
    );
}
