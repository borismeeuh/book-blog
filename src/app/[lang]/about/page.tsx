export default async function About({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;

    const dutch = lang === 'nl';

    return (
        <section className="space-y-4">
            <h2 className="text-3xl font-semibold">
                {dutch ? "Over mij" : "About me"}
            </h2>

            {dutch ? (
                <>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        Hallo! Ik ben de schrijver van dit boekenblog. Ik deel hier mijn
                        gedachten over boeken die ik lees — van romans tot non-fictie, in het
                        Nederlands én Engels.
                    </p>

                    <p className="text-lg text-zinc-700 dark:text-zinc-300">
                        Deze site is gebouwd met Next.js, TypeScript en Tailwind CSS. 🎨
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
