/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // Enable dark mode support
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            bg: "var(--color-bg)",
            text: "var(--color-text)",
            "secondary-bg": "var(--color-secondary-bg)",
            border: "var(--color-border)",
            icon: "var(--color-icon)",
            "sidebar-bg": "var(--color-sidebar-bg)",
            white: "var(--color-white)",
            black: "var(--color-black)",
            "text-secondary": "var(--color-text-secondary)",
            "cloud-white": "var(--color-cloud-white)",
            "slate-blue": "var(--color-slate-blue)",

            "gray-dark": "var(--color-gray-dark)",
            "gray-soft": "var(--color-gray-soft)",
            "gray-very-dark": "var(--color-gray-very-dark)",
            "gray-deep": "var(--color-gray-deep)",
            "gray-muted": "var(--color-gray-muted)",
            "gray-cool": "var(--color-gray-cool)",
            "gray-steel": "var(--color-gray-steel)",
            "gray-ink": "var(--color-gray-ink)",

            "indigo-primary": "var(--color-indigo-primary)",
            "indigo-hover": "var(--color-indigo-hover)",

            "red-primary": "var(--color-red-primary)",
            "red-hover": "var(--color-red-hover)",

            "button3-bg": "var(--color-button3-bg)",
            "button3-text": "var(--color-button3-text)",
            "button3-hover": "var(--color-button3-hover)",

            "button4-bg": "var(--color-button4-bg)",
            "button4-text": "var(--color-button4-text)",
            "button4-hover": "var(--color-button4-hover)",
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)"],
            },
            boxShadow: {
                custom: "0px 10px 10px -10px rgba(72,84,159,0.1004)",
                "dd-dark": "0px 10px 20px 0px rgba(0, 0, 0, 0.25)",
                "dd-light": "0px 10px 20px 0px rgba(72, 84, 159, 0.25)",
            },
        },
    },
    plugins: [],
};
