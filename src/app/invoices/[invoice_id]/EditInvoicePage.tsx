"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import MenubarLarge from "@/components/common/MenubarLarge";
import MenubarSmall from "@/components/common/MenubarSmall";
import FormLoaderUi from "@/components/invoiceForm/FormLoaderUI";
import InvoiceFormSmall from "@/components/invoiceForm/InvoiceFormSmall";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceFormProps } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { useParams } from "next/navigation";
import { JSX } from "react";

export default function EditInvoicePage({
    handleBack,
    handleReset,
    handleSubmit,
    invoice,
    setInvoice,
    isPending,
    isLoading,
}: InvoiceFormProps): JSX.Element {
    const params = useParams();
    const invoiceId = params.invoice_id as string;

    useLockScroll(true);

    return (
        <div className="bg-bg scrollbar-none fixed inset-0 w-full overflow-auto lg:flex lg:flex-col lg:items-center lg:justify-center">
            <MenubarSmall extendedCls="lg:hidden" />
            <MenubarLarge extendedCls="hidden lg:flex" />

            <div className="w-full lg:ml-26 lg:max-w-169">
                <BackButton
                    onClick={handleBack}
                    extendedCls="md:ml-14 lg:ml-0"
                />

                {isLoading ? (
                    <FormLoaderUi />
                ) : (
                    <div>
                        {invoice && (
                            <div>
                                <div className="mt-6 mb-22 px-6 md:mt-8 md:mb-4 md:px-14 lg:px-0">
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

                                <div className="bg-secondary-bg md:bg-bg shadow-custom flex h-[91px] items-center justify-end gap-2 px-6 md:h-28 md:px-14 lg:px-0">
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
                                                    <span>Please wait!</span>
                                                </div>
                                            ) : (
                                                "Save Invoice"
                                            )
                                        }
                                        onClick={() => handleSubmit(invoice)}
                                        disabled={isPending}
                                        variant="indigoButton"
                                        extendedClass="w-[138px] md:w-[150px]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
