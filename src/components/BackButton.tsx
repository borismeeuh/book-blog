"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackButton({ lang }: { lang: string }) {
    const router = useRouter();

    return (
        <Link
            className="underline-hover"
            href={`/${lang}`}
            hrefLang={lang}
        >
            ← { lang === 'en' ? 'Back' : 'Terug'}
        </Link>
    );
}
