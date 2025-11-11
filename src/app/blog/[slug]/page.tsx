import { getPost } from "@/lib/posts";

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    return (
        <article className="space-y-4">
            <h2 className="text-3xl font-bold">{post.title}</h2>
            <p className="text-zinc-500 text-sm">
                door {post.author} – genre: {post.genre}
            </p>
            <div
                className="prose prose-zinc dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
        </article>
    );
}
