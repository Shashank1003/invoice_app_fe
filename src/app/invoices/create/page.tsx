"use client";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { emptyInvoiceData } from "@/misc/emptyInvoiceData";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateNewInvoice(): JSX.Element {
    const router = useRouter();
    const { activeInvoice, setActiveInvoice } = useInvoiceContext();
    const { mutate: createInvoice, isPending } = useCreateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);

    useEffect(() => {
        if (!emptyInvoiceData) return;
        setInvoice(emptyInvoiceData || null);
        setActiveInvoice(emptyInvoiceData || null);
    }, [setActiveInvoice]);

    const handleBack = useCallback(() => {
        router.push("/invoices");
    }, [router]);

    const handleReset = useCallback(() => {
        setInvoice(activeInvoice);
    }, [activeInvoice]);

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
                    router.push(`/invoices?scrollId=invoiceCard-${data.id}`);
                },
            });
        },
        [createInvoice, router]
    );

    return (
        <div>
            <Menubar />

            <BackButton onClick={handleBack} />

            <div className="mt-6 mb-22 px-6">
                <div className="text-text text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                    <p>New Invoice</p>
                </div>

                {invoice && (
                    <InvoiceForm
                        invoice={invoice}
                        isDateDisabled={false}
                        setInvoice={setInvoice}
                    />
                )}
            </div>

            <div className="bg-secondary-bg shadow-custom flex h-[91px] items-center justify-center gap-2 px-6">
                <CustomButton
                    buttonText="Discard"
                    onClick={handleReset}
                    variant="button3"
                    extendedClass="w-[84px]"
                />

                {invoice && (
                    <CustomButton
                        buttonText="Save as Draft"
                        onClick={() => handleSubmit(invoice, true)}
                        variant="button4"
                        extendedClass="w-[117px]"
                    />
                )}

                {invoice && (
                    <CustomButton
                        buttonText={isPending ? "Saving..." : "Save & Send"}
                        onClick={() => handleSubmit(invoice)}
                        variant="indigoButton"
                        extendedClass="w-[112px]"
                    />
                )}
            </div>
        </div>
    );
}
