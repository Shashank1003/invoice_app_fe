import { RootAlert } from "@/components/common/RootAlert";
import { InvoiceProvider } from "@/context/invoiceContext";
import { TanstackProvider } from "@/context/tanstackProvider";
import { ThemeProvider } from "@/context/themeContext";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import { FC, ReactNode } from "react";
import { Toaster } from "sonner";

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
                className={`${leagueSpartan.variable} antialiased, theme-transition`}
                suppressHydrationWarning={true}
            >
                <ThemeProvider>
                    <TanstackProvider>
                        <InvoiceProvider>
                            <div>{children}</div>
                        </InvoiceProvider>
                    </TanstackProvider>
                    <Toaster
                        position="top-right"
                        richColors
                        toastOptions={{
                            classNames: {
                                toast: "!bg-secondary-bg !text-text !rounded-[8px] !py-[14px] md:!py-4 lg:!py-[18px] !px-[18px] md:!px-[22px] lg:!px-6 !shadow-toaster !border !border-border !text-[14px] md:!text-[15px] lg:!text-[16px] !font-medium !flex !items-center !gap-3 !transition-all !duration-300 !ease-in-out !max-w-100 md:!max-w-115 lg:!max-w-125  md:!w-full !mr-4 md:!mr-8 lg:!mr-12",

                                success: "!border-l-4 !border-l-color-success",
                                error: "!border-l-4 !border-l-color-error",
                                warning: "!border-l-4 !border-l-color-warning",
                                info: "!border-l-4 !border-l-color-info ",
                            },
                        }}
                    />
                    <RootAlert />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
