import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "plugin:@typescript-eslint/recommended"
    ),

    {
        files: ["**/*.{js,ts,jsx,tsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },

        plugins: {
            prettier: prettierPlugin,
            "@typescript-eslint": tsPlugin,
        },

        rules: {
            "no-console": "warn",
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                },
            ],
            eqeqeq: ["error", "always"],
            semi: ["error", "always"],
            quotes: ["error", "double"],
            indent: ["error", 2],
            "sort-imports": "off",

            // "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/no-explicit-any": "warn",

            // Only enforce Prettier rules based on .prettierrc
            "prettier/prettier": "error",
        },
    },

    ...compat.extends("prettier"),
];

export default eslintConfig;
