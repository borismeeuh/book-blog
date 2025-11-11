interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

const posts = {
    "de-donkere-toren": {
        title: "De Donkere Toren",
        content:
            "Een epische fantasyreeks van Stephen King die elementen van horror, western en sciencefiction combineert.",
    },
    "atomic-habits": {
        title: "Atomic Habits",
        content:
            "Een praktisch boek over hoe kleine gewoontes leiden tot grote veranderingen, geschreven door James Clear.",
    },
    "de-avonden": {
        title: "De Avonden",
        content:
            "Een klassieker van Gerard Reve over de sleur en absurditeit van het naoorlogse leven.",
    },
};

export default async function BlogPost({ params }: BlogPostProps) {
    console.log("Slug ontvangen:", params);

    const { slug } = await params;
    const post = posts[slug as keyof typeof posts];

    if (!post) {
        return <p>Post niet gevonden</p>;
    }

    return (
        <article className="space-y-4">
            <h2 className="text-3xl font-bold">{post.title}</h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300">{post.content}</p>
        </article>
    );
}
