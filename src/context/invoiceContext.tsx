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

    return (
        <InvoiceContext.Provider
            value={{
                invoices,
                setInvoices,
                activeInvoice,
                setActiveInvoice,
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
