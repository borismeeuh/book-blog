import { getPost } from "@/lib/posts";
import BackButton from "@/components/BackButton";
import { ViewTransition } from "react";

interface BlogPostProps {
    params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { lang, slug } = await params;

    const post = await getPost(lang, slug);

    return (
        <article className="space-y-4">
            <BackButton lang={lang} />
            <ViewTransition name={`blog-title-${post.slug}`}>
                <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-50">{post.title}</h1>
            </ViewTransition>

            <ViewTransition name={`blog-genres-${post.slug}`}>
                <div className="flex justify-between gap-2">
                    <p className="text-stone-800 dark:text-stone-50 opacity-75 text-sm">
                        {post.author} – {post.genre.join(", ")}
                    </p>
                    <time dateTime={post.date.toISOString().slice(0, 10)} className="text-sm text-stone-800 dark:text-stone-50 opacity-75">
                        {post.date.toLocaleDateString("nl-NL")}
                    </time>
                </div>
            </ViewTransition>

            <div
                className="prose prose-zinc dark:prose-invert text-stone-800 dark:text-stone-50"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </article>
    );
}
