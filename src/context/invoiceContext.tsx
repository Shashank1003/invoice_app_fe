"use client";

import { InvoiceBrief, InvoiceDetailed } from "@/types/invoiceTypes";
import React, {
    createContext,
    JSX,
    ReactNode,
    useContext,
    useState,
} from "react";

export interface InvoiceContextType {
    invoices: InvoiceBrief[];
    setInvoices: (_invoices: InvoiceBrief[]) => void;
    activeInvoice: InvoiceDetailed | null;
    setActiveInvoice: (_invoice: InvoiceDetailed | null) => void;
    scrollToId: string | null;
    setScrollToId: (_scrollId: string | null) => void;
}
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [invoices, setInvoices] = useState<InvoiceBrief[]>([]);
    const [activeInvoice, setActiveInvoice] = useState<InvoiceDetailed | null>(
        null
    );
    const [scrollToId, setScrollToId] = useState<string | null>(null);

    return (
        <InvoiceContext.Provider
            value={{
                invoices,
                setInvoices,
                activeInvoice,
                setActiveInvoice,
                scrollToId,
                setScrollToId,
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};

export const useInvoiceContext = (): InvoiceContextType => {
    const context = useContext(InvoiceContext);
    if (!context)
        throw new Error(
            "useInvoiceContext must be used within InvoiceProvider"
        );
    return context;
};
