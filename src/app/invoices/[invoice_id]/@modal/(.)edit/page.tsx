"use client";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
import FormLoaderUi from "@/components/invoiceForm/FormLoaderUI";
import InvoiceFormSmall from "@/components/invoiceForm/InvoiceFormSmall";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useFetchInvoiceById, useUpdateInvoice } from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { useMediaQuery } from "@react-hookz/web";
import { useParams, useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditInvoice(): JSX.Element {
    const router = useRouter();
    const params = useParams();
    const invoiceId = params.invoice_id as string;
    const { setActiveInvoice, activeInvoice } = useInvoiceContext();
    const { data, isLoading } = useFetchInvoiceById(invoiceId);
    const { mutate: updateInvoice, isPending } = useUpdateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);
    const isMd = useMediaQuery("(min-width: 768px)");

    useLockScroll(true);

    useEffect(() => {
        if (!data || !invoiceId) return;
        setInvoice(data || null);
        setActiveInvoice(data || null);
    }, [data, setActiveInvoice, invoiceId]);

    const backHandler = useCallback(() => {
        router.back();
    }, [router]);

    const handleReset = useCallback(() => {
        setInvoice(activeInvoice);
        backHandler();
    }, [activeInvoice, backHandler]);

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
                },
            });
        },
        [updateInvoice, setActiveInvoice]
    );

    return (
        <div className="fixed inset-0 flex flex-col">
            <div className="bg-bg shrink-0">
                <Menubar />
            </div>

            <div className="flex-1 overflow-hidden bg-black/50">
                <div className="bg-bg scrollbar-none h-full w-154 overflow-auto">
                    {!isMd && <BackButton onClick={backHandler} />}

                    {isLoading ? (
                        <FormLoaderUi />
                    ) : (
                        <div>
                            {invoice && (
                                <div>
                                    <div className="mt-6 mb-22 px-6 md:mt-14 md:mb-4 md:px-14">
                                        <div className="text-text text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                            <p>
                                                Edit{" "}
                                                <span className="text-gray-steel">
                                                    #
                                                </span>
                                                {renderId(invoiceId)}
                                            </p>
                                        </div>

                                        <InvoiceFormSmall
                                            invoice={invoice}
                                            isDateDisabled={false}
                                            setInvoice={setInvoice}
                                        />
                                    </div>

                                    <div className="bg-secondary-bg md:bg-bg shadow-custom flex h-[91px] items-center justify-end gap-2 px-6 md:h-28 md:px-14">
                                        <CustomButton
                                            buttonText="Cancel"
                                            onClick={handleReset}
                                            variant="button3"
                                            extendedClass="w-[96px]"
                                        />

                                        <CustomButton
                                            buttonText={
                                                isPending ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                        <span>
                                                            Please wait!
                                                        </span>
                                                    </div>
                                                ) : (
                                                    "Save Invoice"
                                                )
                                            }
                                            onClick={() =>
                                                handleSubmit(invoice)
                                            }
                                            disabled={isPending}
                                            variant="indigoButton"
                                            extendedClass="w-[138px]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
