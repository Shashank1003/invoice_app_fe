"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import MenubarLarge from "@/components/common/MenubarLarge";
import MenubarSmall from "@/components/common/MenubarSmall";
import InvoiceFormSmall from "@/components/invoiceForm/InvoiceFormSmall";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { emptyInvoiceData } from "@/misc/emptyInvoiceData";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useMediaQuery } from "@react-hookz/web";
import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateNewInvoice(): JSX.Element {
    const router = useRouter();
    const { activeInvoice, setActiveInvoice } = useInvoiceContext();
    const { mutate: createInvoice, isPending } = useCreateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);
    const isMd = useMediaQuery("(min-width: 768px)");

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
                    router.push(`/invoices?scrollId=invoiceCard-${data.id}`);
                },
            });
        },
        [createInvoice, router]
    );

    return (
        <div className="bg-bg w-full lg:flex lg:flex-col lg:items-center lg:justify-center">
            <MenubarSmall extendedCls="lg:hidden" />
            <MenubarLarge extendedCls="hidden lg:flex" />

            <div className="w-full max-w-169 lg:ml-26">
                <BackButton
                    onClick={handleBack}
                    extendedCls="md:ml-14 lg:ml-0"
                />

                {invoice && (
                    <div>
                        <div className="mt-6 mb-22 px-6 md:mt-8 md:mb-4 md:px-14 lg:px-0">
                            <div className="text-text text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                <p>New Invoice</p>
                            </div>

                            <InvoiceFormSmall
                                invoice={invoice}
                                isDateDisabled={false}
                                setInvoice={setInvoice}
                            />
                        </div>
                        <div className="bg-secondary-bg md:bg-bg shadow-custom flex h-[91px] w-full items-center justify-end gap-2 px-6 md:h-28 md:!justify-between md:px-14 lg:px-0">
                            <CustomButton
                                buttonText="Discard"
                                onClick={handleReset}
                                variant="button3"
                                extendedClass="!w-21 md:!w-24"
                            />

                            <CustomButton
                                buttonText={
                                    isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                            <span>Please wait!</span>
                                        </div>
                                    ) : (
                                        "Save as Draft"
                                    )
                                }
                                onClick={() => handleSubmit(invoice, true)}
                                variant="button4"
                                extendedClass="!w-[117px] md:!w-[134px] md:hidden"
                                disabled={isPending}
                            />

                            <CustomButton
                                buttonText={
                                    isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                            <span>Please wait!</span>
                                        </div>
                                    ) : (
                                        "Save & Send"
                                    )
                                }
                                disabled={isPending}
                                onClick={() => handleSubmit(invoice)}
                                variant="indigoButton"
                                extendedClass="!w-28 md:!w-32 md:hidden"
                            />

                            <div className="hidden items-center justify-end gap-2 md:flex">
                                <CustomButton
                                    buttonText={
                                        isPending ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                <span>Please wait!</span>
                                            </div>
                                        ) : (
                                            "Save as Draft"
                                        )
                                    }
                                    onClick={() => handleSubmit(invoice, true)}
                                    variant="button4"
                                    extendedClass="!w-[134px]"
                                    disabled={isPending}
                                />

                                <CustomButton
                                    buttonText={
                                        isPending ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                <span>Please wait!</span>
                                            </div>
                                        ) : (
                                            "Save & Send"
                                        )
                                    }
                                    disabled={isPending}
                                    onClick={() => handleSubmit(invoice)}
                                    variant="indigoButton"
                                    extendedClass="!w-32"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
