import { getPost } from "@/lib/posts";
import BackButton from "@/components/BackButton";
import { ViewTransition } from "react";
import Image from "next/image";

interface BlogPostProps {
    params: Promise<{ lang: string; slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { lang, slug } = await params;

    const post = await getPost(lang, slug);

    return (
        <article className="grid grid-cols-1 md:grid-cols-[7fr_3fr] md:grid-rows-[auto_1fr] gap-4">
            <div>
                <nav>
                    <BackButton lang={lang} />
                </nav>

                <header className="space-y-4">
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
                </header>
            </div>

            <div className="none md:block"></div>

            <section
                className="prose prose-zinc dark:prose-invert text-stone-800 dark:text-stone-50 order-3"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <aside className="order-2 md:order-4">
                <ViewTransition name={`blog-title-image-${post.slug}`}>
                    <figure className="rounded-md overflow-hidden mb-3 w-full sm:w-auto">
                        <Image
                            alt={post.title}
                            className="w-full"
                            height={400}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={`/images/covers/${post.image}`}
                            width={400}
                        />
                    </figure>
                </ViewTransition>
            </aside>
        </article>
    );
}
