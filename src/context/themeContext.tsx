"use client";
import ThemeTransitionOverlay from "@/components/common/ThemeTransitionOverlay";
import React, {
    createContext,
    JSX,
    useContext,
    useEffect,
    useState,
} from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as string | null;
        const prefersDark = window.matchMedia(
            "(prefers-color-schema: dark)"
        ).matches;

        setIsDarkMode(saved === "dark" || (!saved && prefersDark));
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            document.cookie = `theme=dark; path=/; max-age=31536000`;
        } else {
            root.classList.remove("dark");
            document.cookie = `theme=light; path=/; max-age=31536000`;
        }
    }, [isDarkMode]);

    return (
        <themeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </themeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(themeContext);
    if (!context)
        throw new Error("useThemeContext must be used within ThemeProvider");
    return context;
};
