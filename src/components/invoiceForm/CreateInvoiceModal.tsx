"use client";

import CloseIcon from "@/assets/icon-close.svg";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceFormProps } from "@/types/invoiceTypes";
import { useMediaQuery } from "@react-hookz/web";
import { JSX } from "react";

export default function CreateInvoiceModal({
    handleBack,
    handleReset,
    handleSubmit,
    invoice,
    setInvoice,
    isPending,
}: InvoiceFormProps): JSX.Element {
    const isMd = useMediaQuery("(min-width: 768px)");
    useLockScroll(true);

    return (
        <div className="theme-transition fixed inset-0 flex flex-col">
            <div className="bg-bg theme-transition shrink-0">
                <MenubarSmall extendedCls="lg:hidden" />
                <MenubarLarge extendedCls="hidden lg:flex" />
            </div>

            <div className="theme-transition flex-1 overflow-hidden bg-black/50 lg:ml-26">
                <div className="bg-bg theme-transition scrollbar-none relative h-full w-154 overflow-auto">
                    {isMd ? (
                        <TransparentButton
                            ButtonIcon={CloseIcon}
                            onClick={handleBack}
                            className="text-form-label theme-transition hover:text-text absolute top-4 right-4 lg:top-6 lg:right-6"
                        />
                    ) : (
                        <BackButton onClick={handleBack} />
                    )}

                    {invoice && (
                        <div>
                            <div className="mt-6 mb-22 px-6 md:mt-14 md:mb-4 md:px-14">
                                <div className="text-text theme-transition text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                                    <p>New Invoice</p>
                                </div>

                                <InvoiceForm
                                    invoice={invoice}
                                    isDateDisabled={false}
                                    setInvoice={setInvoice}
                                    isModal={true}
                                />
                            </div>

                            <div className="bg-secondary-bg md:bg-bg theme-transition shadow-custom flex h-[91px] w-full items-center justify-end gap-2 px-6 md:h-28 md:!justify-between md:px-14">
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
                                                <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
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
                                    extendedClass="!w-28 md:!w-32 md:hidden"
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
