import Link from "next/link";

const posts = [
    { title: "De Donkere Toren", slug: "de-donkere-toren", author: "Stephen King" },
    { title: "Atomic Habits", slug: "atomic-habits", author: "James Clear" },
    { title: "De Avonden", slug: "de-avonden", author: "Gerard Reve" },
];

export default function BlogPage() {
    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-semibold">📚 Boekenblog</h2>
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
