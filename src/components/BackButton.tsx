"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ lang }: { lang: string }) {
    const router = useRouter();

    return (
            <button onClick={() => router.back()} className="underline-hover">
            ← { lang === 'en' ? 'Back' : 'Terug'}
        </button>
    );
}
