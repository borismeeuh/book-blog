// import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackButton({ lang }: { lang: string }) {
    // const router = useRouter();

    return (
        <Link
            className="underline-hover mb-6 block w-fit"
            // Tijdelijk gaat de terug knop niet écht terug. Heeft te maken met een cache/navigatie bug in
            // hoe Next nu met de view transitions omgaat.
            href={`/${lang}`}
            hrefLang={lang}
        >
            ← { lang === 'en' ? 'Back' : 'Terug'}
        </Link>
    );
}
