"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceFormProps } from "@/types/invoiceTypes";
import { JSX } from "react";

export default function CreateInvoicePage({
    handleBack,
    handleReset,
    handleSubmit,
    invoice,
    setInvoice,
    isPending,
}: InvoiceFormProps): JSX.Element {
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

                {invoice && (
                    <div>
                        <div className="theme-transition mt-6 mb-22 px-6 md:mt-8 md:mb-4 md:px-14 lg:px-0">
                            <div className="text-text theme-transition text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                <p>New Invoice</p>
                            </div>

                            <InvoiceForm
                                invoice={invoice}
                                isDateDisabled={false}
                                setInvoice={setInvoice}
                                isModal={false}
                            />
                        </div>
                        <div className="bg-secondary-bg theme-transition md:bg-bg shadow-custom flex h-[91px] w-full items-center justify-end gap-2 px-6 md:h-28 md:!justify-between md:px-14 lg:px-0">
                            <CustomButton
                                buttonText="Discard"
                                onClick={handleReset}
                                variant="button3"
                                extendedClass="w-21 md:w-24"
                            />

                            <CustomButton
                                buttonText={
                                    isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                            <span>Please wait!</span>
                                        </div>
                                    ) : (
                                        "Save as Draft"
                                    )
                                }
                                onClick={() => handleSubmit(invoice, true)}
                                variant="button4"
                                extendedClass="w-29  md:hidden"
                                disabled={isPending}
                            />

                            <CustomButton
                                buttonText={
                                    isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                            <span>Please wait!</span>
                                        </div>
                                    ) : (
                                        "Save & Send"
                                    )
                                }
                                disabled={isPending}
                                onClick={() => handleSubmit(invoice)}
                                variant="indigoButton"
                                extendedClass="w-28 md:hidden"
                            />

                            <div className="hidden items-center justify-end gap-2 md:flex">
                                <CustomButton
                                    buttonText={
                                        isPending ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                <span>Please wait!</span>
                                            </div>
                                        ) : (
                                            "Save as Draft"
                                        )
                                    }
                                    onClick={() => handleSubmit(invoice, true)}
                                    variant="button4"
                                    extendedClass="w-[134px]"
                                    disabled={isPending}
                                />

                                <CustomButton
                                    buttonText={
                                        isPending ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                <span>Please wait!</span>
                                            </div>
                                        ) : (
                                            "Save & Send"
                                        )
                                    }
                                    disabled={isPending}
                                    onClick={() => handleSubmit(invoice)}
                                    variant="indigoButton"
                                    extendedClass="w-32"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
