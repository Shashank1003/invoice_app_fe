"use client";

import CreateInvoiceModal from "@/components/invoiceForm/CreateInvoiceModal";
import CreateInvoicePage from "@/components/invoiceForm/CreateInvoicePage";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { emptyInvoiceData } from "@/misc/emptyInvoiceData";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useMediaQuery } from "@react-hookz/web";
import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateNewInvoice(): JSX.Element {
    const router = useRouter();
    const { activeInvoice, setActiveInvoice, setScrollToId } =
        useInvoiceContext();
    const { mutate: createInvoice, isPending } = useCreateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);
    const isSm = useMediaQuery("(max-width: 767px)");

    useLockScroll(true);

    useEffect(() => {
        if (!emptyInvoiceData) return;
        setInvoice(emptyInvoiceData || null);
        setActiveInvoice(emptyInvoiceData || null);
    }, [setActiveInvoice]);

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    const handleReset = useCallback(() => {
        setInvoice(activeInvoice);
        handleBack();
    }, [activeInvoice, handleBack]);

    const handleSubmit = useCallback(
        (payload: InvoiceDetailed, isDraft: boolean = false) => {
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
                status: isDraft ? "DRAFT" : "PENDING",
                items: result.data.items.map(val => {
                    if (val?.id?.startsWith("temp-")) {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const { id, ...rest } = val;
                        return rest;
                    }
                    return val;
                }),
            };
            createInvoice(updatedPayload, {
                onSuccess: data => {
                    const id = data?.id;
                    sessionStorage.setItem("scrollToId", id ?? "");
                    sessionStorage.setItem("shouldScroll", "true");
                    setScrollToId(id ?? null);
                    router.back();
                },
            });
        },
        [createInvoice, router]
    );

    return !isSm ? (
        <CreateInvoiceModal
            handleBack={handleBack}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            invoice={invoice}
            setInvoice={setInvoice}
            isPending={isPending}
        />
    ) : (
        <CreateInvoicePage
            handleBack={handleBack}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            invoice={invoice}
            setInvoice={setInvoice}
            isPending={isPending}
        />
    );
}
