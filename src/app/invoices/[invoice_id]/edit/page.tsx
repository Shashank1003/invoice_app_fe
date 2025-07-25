"use client";

import EditInvoicePage from "@/components/invoiceForm/EditInvoicePage";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useFetchInvoiceById, useUpdateInvoice } from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useParams, useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditInvoice(): JSX.Element {
    const router = useRouter();
    const params = useParams();
    const invoiceId = params.invoice_id as string;
    const { setActiveInvoice, activeInvoice, setScrollToId } =
        useInvoiceContext();
    const { data, isLoading } = useFetchInvoiceById(invoiceId);
    const { mutate: updateInvoice, isPending } = useUpdateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);

    useLockScroll(isPending);

    useEffect(() => {
        if (!data || !invoiceId) return;
        setInvoice(data || null);
        setActiveInvoice(data || null);
        setScrollToId(`invoiceCard-${invoiceId}`);
    }, [data, setActiveInvoice, invoiceId]);

    const handleBack = useCallback(() => {
        router.push(`/invoices/${invoiceId}`);
    }, [router]);

    const handleReset = useCallback(() => {
        setInvoice(activeInvoice);
        handleBack();
    }, [activeInvoice, handleBack]);

    const handleSubmit = useCallback(
        (payload: InvoiceDetailed) => {
            const result = invoiceDetailedSchema.safeParse(payload);

            if (!result.success) {
                //Show all error messages in single toast
                // const messages = result.error.issues
                //     .map(issue => `• ${issue.message}`)
                //     .join("\n");
                // toast.error(messages);

                // Separate toast for each error message
                result.error.issues.forEach(issue => {
                    toast.error(issue.message);
                });
                return;
            }

            const updatedPayload = {
                ...result.data,
                items: result.data.items.map(val => {
                    if (val?.id?.startsWith("temp-")) {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const { id, ...rest } = val;
                        return rest;
                    }
                    return val;
                }),
            };
            updateInvoice(updatedPayload, {
                onSuccess: () => {
                    setActiveInvoice(updatedPayload);
                    handleBack();
                },
            });
        },
        [updateInvoice, setActiveInvoice]
    );

    return (
        <EditInvoicePage
            handleBack={handleBack}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            invoice={invoice}
            setInvoice={setInvoice}
            isPending={isPending}
            isLoading={isLoading}
        />
    );
}
