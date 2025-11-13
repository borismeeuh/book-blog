"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface BlogPost {
    slug: string;
    title: string;
    author: string;
    genre: string[];
}

interface Props {
    posts: BlogPost[];
}


export default function BlogListWithFilters({ posts }: Props) {
    const router = useRouter();

    const genres = Array.from(
        new Set(posts.flatMap((p) => p.genre))
    );
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const initialGenre = searchParams.get("genre") || "alle";

    const [search, setSearch] = useState(initialSearch);
    const [genre, setGenre] = useState(initialGenre);

    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (genre !== "alle") params.set("genre", genre);

        const queryString = params.toString();
        router.replace(`?${queryString}`, { scroll: false });
    }, [search, genre, router]);

    const filteredPosts = posts.filter((post) => {
        const matchSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.author.toLowerCase().includes(search.toLowerCase());

        const matchGenre = genre === "alle" || post.genre.includes(genre);

        return matchSearch && matchGenre;
    });

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Zoek op titel of auteur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-zinc-300 rounded-md px-3 py-2"
                />

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border border-zinc-300 rounded-md px-3 py-2"
                >
                    <option value="alle">Alle genres</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="space-y-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <li key={post.slug} className="border-b border-zinc-200 pb-2">
                            <Link href={`/blogs/${post.slug}`}>
                                <h2 className="text-xl font-semibold hover:underline">
                                    {post.title}
                                </h2>
                            </Link>
                            <p className="text-sm text-zinc-600">
                                door {post.author} – {post.genre}
                            </p>
                        </li>
                    ))
                ) : (
                    <p className="text-zinc-500">Geen resultaten gevonden 😔</p>
                )}
            </ul>
        </section>
    );
}
