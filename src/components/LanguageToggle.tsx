"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LanguageToggle({ lang }: { lang: string }) {
    const pathname = usePathname();

    const parts = pathname.split("/");
    parts[1] = lang === "nl" ? "en" : "nl";
    const newPath = parts.join("/");

    return (
        <Link
            href={newPath}
            hrefLang={lang}
            className="hover:underline">
            {lang === "nl" ? "English" : "Nederlands"}
        </Link>
    );
}
