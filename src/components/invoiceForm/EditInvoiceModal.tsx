"use client";

import CloseIcon from "@/assets/icon-close.svg";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import ModalLoaderUi from "@/components/invoiceForm/ModalLoaderUi";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceFormProps } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { useMediaQuery } from "@react-hookz/web";
import { useParams } from "next/navigation";
import { JSX } from "react";

export default function EditInvoiceModal({
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
    const isMd = useMediaQuery("(min-width: 768px)");

    useLockScroll(true);

    return (
        <div className="theme-transition fixed inset-0 flex flex-col">
            <div className="bg-bg shrink-0">
                <MenubarSmall extendedCls="lg:hidden" />
                <MenubarLarge extendedCls="hidden lg:flex" />
            </div>

            <div className="theme-transition flex-1 overflow-hidden bg-black/50 lg:ml-26">
                <div className="bg-bg theme-transition scrollbar-none relative h-full w-154 overflow-auto">
                    {isMd ? (
                        <TransparentButton
                            ButtonIcon={CloseIcon}
                            onClick={handleBack}
                            className="text-form-label hover:text-text absolute top-4 right-4 lg:top-6 lg:right-6"
                        />
                    ) : (
                        <BackButton onClick={handleBack} />
                    )}
                    {isLoading ? (
                        <ModalLoaderUi />
                    ) : (
                        <div>
                            {invoice && (
                                <div>
                                    <div className="mt-6 mb-22 px-6 md:mt-14 md:mb-4 md:px-14">
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
                                            isModal={true}
                                        />
                                    </div>

                                    <div className="bg-secondary-bg md:bg-bg theme-transition shadow-custom flex h-[91px] items-center justify-end gap-2 px-6 md:h-28 md:px-14">
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
                                                        <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                        <span>
                                                            Please wait!
                                                        </span>
                                                    </div>
                                                ) : (
                                                    "Save Changes"
                                                )
                                            }
                                            onClick={() =>
                                                handleSubmit(invoice)
                                            }
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
        </div>
    );
}
