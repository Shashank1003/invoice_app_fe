"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import PageLoaderUi from "@/components/invoiceForm/PageLoaderUi.tsx";
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
        <div className="bg-bg scrollbar-none theme-transition fixed inset-0 w-full overflow-auto lg:flex lg:flex-col lg:items-center lg:justify-start">
            <MenubarSmall extendedCls="lg:hidden" />
            <MenubarLarge extendedCls="hidden lg:flex" />

            <div className="w-full lg:ml-26 lg:max-w-169">
                <BackButton
                    onClick={handleBack}
                    extendedClass="md:ml-14 lg:ml-0"
                />

                {isLoading ? (
                    <PageLoaderUi />
                ) : (
                    <div>
                        {invoice && (
                            <div>
                                <div className="mt-6 mb-22 px-6 md:mt-8 md:mb-4 md:px-14 lg:px-0">
                                    <div className="text-text theme-transition text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                        <p>
                                            Edit{" "}
                                            <span className="text-gray-steel theme-transition">
                                                #
                                            </span>
                                            {renderId(invoiceId)}
                                        </p>
                                    </div>

                                    <InvoiceForm
                                        invoice={invoice}
                                        isDateDisabled={true}
                                        setInvoice={setInvoice}
                                        isModal={false}
                                    />
                                </div>

                                <div className="bg-secondary-bg theme-transition md:bg-bg shadow-custom flex h-[91px] items-center justify-end gap-2 px-6 md:h-28 md:px-14 lg:px-0">
                                    <CustomButton
                                        buttonText="Cancel"
                                        onClick={handleReset}
                                        variant="button3"
                                        extendedClass="w-24"
                                    />

                                    <CustomButton
                                        buttonText={
                                            isPending ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
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
