import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LanguageToggle from "@/components/LanguageToggle";
import Link from "next/link";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mijn Boekenblog",
    description: "Lees mijn recensies, gedachten en boekentips.",
};

export default async function LangLayout({children, params,}: { children: React.ReactNode; params: Promise<{ lang: string }>; }) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50`}>
                <header className="w-full border-b border-zinc-200 dark:border-zinc-700 p-4">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold">
                            <Link
                                className="text-classic-accent"
                                href={`/${lang}`}
                                hrefLang={lang}
                            >
                                Home
                            </Link>
                        </h1>
                        <nav className="space-x-4">
                            <Link
                                className="hover:underline"
                                href={`/${lang}/about`}
                                hrefLang={lang}
                            >
                                {lang === 'nl' ? "Over deze site" : "About"}
                            </Link>
                            <Link
                                className="hover:underline"
                                href={`/${lang}/blogs`}
                                hrefLang={lang}
                            >
                                Blogs
                            </Link>
                            <LanguageToggle lang={lang} />
                        </nav>
                    </div>
                </header>
                <main className="max-w-4xl mx-auto p-6">{children}</main>
            </body>
        </html>
    );
}