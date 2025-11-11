import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50`}
        >
        <header className="w-full border-b border-zinc-200 dark:border-zinc-700 p-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">📚 Mijn Boekenblog</h1>
                <nav className="space-x-4">
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                    <a href="/over" className="hover:underline">
                        Over mij
                    </a>
                    <a href="/blog" className="hover:underline">
                        Blogs
                    </a>
                </nav>
            </div>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        </body>
        </html>
    );
}