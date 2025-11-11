import Link from "next/link";

interface BlogPost {
    slug: string;
    title: string;
    author: string;
    genre?: string;
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Alle artikelen</h2>
            <ul className="space-y-3">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-lg text-blue-600 hover:underline"
                        >
                            {post.title}
                        </Link>{" "}
                        <span className="text-zinc-500">door {post.author}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
