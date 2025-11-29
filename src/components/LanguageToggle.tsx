"use client";

import { usePathname } from "next/navigation";

export default function LanguageToggle({ lang }: { lang: string }) {
    const pathname = usePathname();

    const parts = pathname.split("/");
    parts[1] = lang === "nl" ? "en" : "nl";
    const newPath = parts.join("/");

    return (
        <a href={newPath} className="hover:underline">
            {lang === "nl" ? "English" : "Nederlands"}
        </a>
    );
}
