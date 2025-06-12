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
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
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
