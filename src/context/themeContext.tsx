"use client";
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

        if (saved) {
            if (saved === "dark") {
                setIsDarkMode(true);
            } else {
                setIsDarkMode(false);
            }
        } else if (prefersDark) {
            setIsDarkMode(true);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
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
