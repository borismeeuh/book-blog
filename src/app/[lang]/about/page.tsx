export default async function About({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    const dutch = lang === 'nl';

    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-semibold">
                {dutch ? "Over dit project" : "About this project"}
            </h1>

            {dutch ? (
                <>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        Deze site is gebouwd met Next.js, TypeScript en Tailwind. Een moderne stack met veel
                        mogelijkheden voor performance-verbetering, goede onderhoudbaarheid en uiteraard volledig
                        responsive.
                    </p>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        Daarnaast is er veel aandacht besteed aan optimalisaties. Snelle performance, geoptimaliseerde
                        toegankelijkheid (a11y) en perfecte SEO prestaties. Allemaal onderdelen van development
                        die van groot belang zijn in het moderne front-endvakgebied.
                    </p>
                </>
            ) : (
                <>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        Hi! I'm the writer of this book blog. I share my thoughts on the
                        books I read — from novels to non-fiction, in both Dutch and English.
                    </p>

                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        This site is built with Next.js, TypeScript, and Tailwind CSS. 🎨
                    </p>
                </>
            )}
        </section>
    );
}
