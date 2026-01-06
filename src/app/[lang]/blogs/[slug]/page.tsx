import { getPost } from "@/lib/posts";

interface BlogPostProps {
    params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { lang, slug } = await params;

    const post = await getPost(lang, slug);

    return (
        <article className="space-y-4">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-50">{post.title}</h2>

            <p className="text-stone-800 dark:text-stone-50 opacity-75 text-sm">
                {post.author} – {post.genre.join(", ")}
            </p>

            <div
                className="prose prose-zinc dark:prose-invert text-stone-800 dark:text-stone-50"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </article>
    );
}
