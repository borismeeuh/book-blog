"use client";

import { useRef } from "react";
import { useTheme } from "@/components/theme-provider";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const iconRef = useRef<SVGPathElement | null>(null);

    const MOON = "M12 2a10 10 0 1 0 10 10a6.5 6.5 0 1 1 -10 -10z";

    const SUN = "M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z";

    function toggleTheme() {
        if (!iconRef.current) return;

        const isDark = theme === "dark";
        const newTheme = isDark ? "light" : "dark";

        gsap.to(iconRef.current, {
            duration: 0.8,
            morphSVG: isDark ? SUN : MOON,
            ease: "power2.inOut",
            onComplete: () => {
                setTheme(newTheme);
            },
        });
    }

    return (
        <button onClick={toggleTheme} className="p-2 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    ref={iconRef}
                    d={theme === "dark" ? MOON : SUN}
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}