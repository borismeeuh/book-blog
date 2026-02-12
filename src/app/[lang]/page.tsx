import { getAllPosts } from "@/lib/posts";
import BlogListWithFilters from "@/components/BlogListWithFilters";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const posts = getAllPosts(lang);

    return (
        <section className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl text-stone-800 dark:text-stone-50">{lang === 'nl' ? "Welkom" : "Welcome"}!</h1>
            <p>{lang === 'nl' ? "De content van deze website is voor test doeleinden en is door AI gegenereerd. Mijn eigen content volgt op een later tijdstip."
                : "The content on this website is for testing purposes and is AI-generated. My own content will be published at a future date."}</p>
            <BlogListWithFilters
                lang={lang}
                posts={posts}
            />
        </section>
    );
}
