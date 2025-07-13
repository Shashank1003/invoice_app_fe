"use client";

import CloseIcon from "@/assets/icon-close.svg";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import Menubar from "@/components/common/MenubarSmall";
import InvoiceFormSmall from "@/components/invoiceForm/InvoiceFormSmall";
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
    const { activeInvoice, setActiveInvoice } = useInvoiceContext();
    const { mutate: createInvoice, isPending } = useCreateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);
    const isMd = useMediaQuery("(min-width: 768px)");
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
                    router.push(`/invoices?scrollId=invoiceCard-${data.id}`);
                },
            });
        },
        [createInvoice, router]
    );

    return (
        <div className="fixed inset-0 flex flex-col">
            <div className="bg-bg shrink-0">
                <Menubar />
            </div>

            <div className="flex-1 overflow-hidden bg-black/50">
                <div className="bg-bg scrollbar-none relative h-full w-154 overflow-auto">
                    {isMd ? (
                        <TransparentButton
                            ButtonIcon={CloseIcon}
                            onClick={handleBack}
                            className="text-form-label hover:text-text absolute top-4 right-4"
                        />
                    ) : (
                        <BackButton onClick={handleBack} />
                    )}

                    {invoice && (
                        <div>
                            <div className="mt-6 mb-22 px-6 md:mt-14 md:mb-4 md:px-14">
                                <div className="text-text text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                    <p>New Invoice</p>
                                </div>

                                <InvoiceFormSmall
                                    invoice={invoice}
                                    isDateDisabled={false}
                                    setInvoice={setInvoice}
                                />
                            </div>

                            <div className="bg-secondary-bg md:bg-bg shadow-custom flex h-[91px] w-full items-center justify-end gap-2 px-6 md:h-28 md:!justify-between md:px-14">
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
                                        onClick={() =>
                                            handleSubmit(invoice, true)
                                        }
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
        </div>
    );
}
