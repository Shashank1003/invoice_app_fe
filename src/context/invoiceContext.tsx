"use client";

import { InvoiceBrief } from "@/types/invoiceTypes";
import React, {
    createContext,
    JSX,
    ReactNode,
    useContext,
    useState,
} from "react";

export interface InvoiceContextType {
    invoices: InvoiceBrief[];
    setInvoices: (invoices: InvoiceBrief[]) => void;
    selectedInvoiceId: string | null;
    setSelectedInvoiceId: (id: string | null) => void;
}
const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [invoices, setInvoices] = useState<InvoiceBrief[]>([]);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
        null
    );

    return (
        <InvoiceContext.Provider
            value={{
                invoices,
                setInvoices,
                selectedInvoiceId,
                setSelectedInvoiceId,
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
