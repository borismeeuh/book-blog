import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const posts = getAllPosts(lang);

    return (
        <section className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl text-stone-800 dark:text-stone-50">{lang === 'nl' ? "Welkom" : "Welcome"}!</h1>
            <BlogListWithFilters
                lang={lang}
                posts={posts}
            />
        </section>
    );
}
