"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface BlogPost {
    slug: string;
    title: string;
    author: string;
    genre: string[];
    date: Date;
}

interface Props {
    lang: string;
    posts: BlogPost[];
}

export default function BlogListWithFilters({ posts, lang }: Props) {
    const router = useRouter();

    const genres = Array.from(
        new Set(posts.flatMap((p) => p.genre))
    );
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get("search") || "";
    const initialGenre = searchParams.get("genre") || "alle";
    const initialSort = "desc";

    const [search, setSearch] = useState(initialSearch);
    const [genre, setGenre] = useState(initialGenre);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSort as "asc" | "desc");

    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (genre !== "alle") params.set("genre", genre);

        const queryString = params.toString();
        router.replace(`?${queryString}`, { scroll: false });
    }, [search, genre, router]);

    let filteredPosts = posts.filter((post) => {
        const matchSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.author.toLowerCase().includes(search.toLowerCase());

        const matchGenre = genre === "alle" || post.genre.includes(genre);

        return matchSearch && matchGenre;
    });

    filteredPosts = filteredPosts.sort((a, b) => {
        return sortOrder === "asc"
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
    });

    return (
        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder={lang === 'nl' ? "Zoek op titel of auteur..." : "Search for title or author..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border-b border-b-stone-800 dark:border-b-stone-50 px-3 py-2 text-stone-800 dark:text-stone-50 dark:placeholder:text-stone-50 placeholder:text-stone-800"
                    name="search"
                />

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border-b border-b-stone-800 dark:border-b-stone-50 text-stone-800 dark:text-stone-50 px-3 py-2 hover:cursor-pointer active:border-none"
                    name="genre-select"
                >
                    <option value="alle" className="bg-zinc-200 dark:bg-stone-900 text-zinc-900 dark:text-stone-100">{lang === 'nl' ? "Alle genres" : "All genres"}</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre} className="bg-zinc-200 dark:bg-stone-900 text-zinc-900 dark:text-stone-100">
                            {genre}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))}
                    className="border-b border-b-stone-800 dark:border-b-stone-50 text-stone-800 dark:text-stone-50 px-3 py-2 hover:cursor-pointer"
                >
                    {sortOrder === "desc"
                        ? lang === "nl"
                            ? "Nieuw → Oud"
                            : "Newest → Oldest"
                        : lang === "nl"
                            ? "Oud → Nieuw"
                            : "Oldest → Newest"}
                </button>
            </div>

            <ul className="space-y-3">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <li key={post.slug} className="border-b border-stone-800 dark:border-b-stone-50 pb-2">
                            <Link
                                href={`/${lang}/blogs/${post.slug}`}
                                hrefLang={lang}
                            >
                                <h2 className="text-xl font-semibold hover:underline text-stone-800 dark:text-stone-50">
                                    {post.title}
                                </h2>
                            </Link>
                            <div className="flex flex-wrap justify-between">
                                <p className="text-sm text-stone-800 dark:text-stone-50 opacity-75">
                                    {post.author} – {post.genre.join(", ")}
                                </p>
                                <p className="text-sm text-stone-800 dark:text-stone-50 opacity-75">
                                    {post.date.toLocaleDateString("nl-NL")}
                                </p>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-zinc-500">{lang === 'nl' ? "Geen resultaten gevonden" : "No results found"}</p>
                )}
            </ul>
        </section>
    );
}
