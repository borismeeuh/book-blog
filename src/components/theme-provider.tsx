"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");

    const applyTheme = (t: Theme) => {
        const root = document.documentElement;

        const actual =
            t === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : t;

        root.classList.toggle("dark", actual === "dark");
        root.classList.toggle("light", actual === "light");
    };

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem("theme", t);
        applyTheme(t);
    };

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        const initial = saved || "system";
        setThemeState(initial);
        applyTheme(initial);

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = () => {
            if (initial === "system") applyTheme("system");
        };
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
    return ctx;
};
