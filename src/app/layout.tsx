import { InvoiceProvider } from "@/context/invoiceContext";
import { TanstackProvider } from "@/context/tanstackProvider";
import { ThemeProvider } from "@/context/themeContext";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import { FC, ReactNode } from "react";

interface RootLayoutProps {
    children: ReactNode;
}

const leagueSpartan = League_Spartan({
    subsets: ["latin"],
    variable: "--font-league-spartan",
});

export const metadata: Metadata = {
    title: "Invoices",
    description: "Invoices app built with Next.js",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en" className={leagueSpartan.variable}>
            <body
                className={`${leagueSpartan.variable} antialiased`}
                suppressHydrationWarning={true}
            >
                <ThemeProvider>
                    <TanstackProvider>
                        <InvoiceProvider>{children}</InvoiceProvider>
                    </TanstackProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
