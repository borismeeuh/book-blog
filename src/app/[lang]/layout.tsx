import React from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import LanguageToggle from "@/components/LanguageToggle";
import Link from "next/link";
import {ThemeProvider} from "@/components/theme-provider";
import ThemeToggle from "@/components/ThemeToggle";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mijn Boekenblog",
    description: "Lees mijn recensies, gedachten en boekentips.",
};

export default async function LangLayout({children, params,}: { children: React.ReactNode; params: Promise<{ lang: string }>; }) {
    const { lang } = await params;

    return (
        <html lang={lang} className={montserrat.variable}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                                (function() {
                                  const saved = localStorage.getItem('theme');
                                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                  const theme = saved === 'light' || saved === 'dark' ? saved : (systemDark ? 'dark' : 'light');
                                  document.documentElement.classList.add(theme);
                                })();
                              `
                    }}
                />
            </head>
            <body className="text-zinc-900 bg-stone-400 dark:bg-stone-800 dark:text-zinc-50">
                <ThemeProvider>
                    <header className="w-full border-b bg-stone-500 dark:bg-stone-900 border-zinc-200 dark:border-zinc-700 p-4">
                        <div className="max-w-4xl mx-auto flex justify-between items-center">
                            <h1 className="text-2xl font-bold">
                                <Link
                                    href={`/${lang}`}
                                    hrefLang={lang}
                                >
                                    Home
                                </Link>
                            </h1>
                            <nav className="space-x-4 flex items-center justify-between">
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
                                <LanguageToggle lang={lang}/>
                                <ThemeToggle />
                            </nav>
                        </div>
                    </header>
                    <main className="max-w-4xl mx-auto p-6">{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}