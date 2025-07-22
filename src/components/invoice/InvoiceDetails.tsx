import StatusBox from "@/components/common/StatusBox";
import ItemsBoxSmall from "@/components/invoice/ItemsBoxSmall";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { useMediaQuery } from "@react-hookz/web";
import clsx from "clsx";
import { format } from "date-fns";
import { JSX } from "react";
import CustomButton from "../common/buttons/CustomButton";
import ItemsBoxMedium from "./ItemsBoxMedium";

interface InvoiceDetailsProps {
    invoiceData: InvoiceDetailed;
    handleEdit: () => void;
    showDeletePopup: () => void;
    isPending: boolean;
    handlePaid: () => void;
}

export default function InvoiceDetails({
    invoiceData,
    handleEdit,
    showDeletePopup,
    isPending,
    handlePaid,
}: InvoiceDetailsProps): JSX.Element {
    const isMd = useMediaQuery("(min-width: 768px)");

    return (
        <div className="theme-transition mb-14 px-6 md:mb-24 md:px-10">
            <div className="bg-secondary-bg theme-transition shadow-custom mt-8 flex h-23 items-center justify-between rounded-[8px] px-6 md:h-22 md:px-8">
                {!isMd ? (
                    <>
                        <p className="text-gray-cool theme-transition dark:text-gray-soft text-[12px] leading-[15px] font-medium tracking-[-0.25px]">
                            Status
                        </p>

                        <StatusBox invoiceStatus={invoiceData.status} />
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-start gap-4">
                            <p className="text-gray-cool theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px]">
                                Status
                            </p>

                            <StatusBox invoiceStatus={invoiceData.status} />
                        </div>
                        <div
                            className={clsx(
                                "flex items-center justify-end gap-2"
                            )}
                        >
                            <CustomButton
                                variant="button3"
                                buttonText="Edit"
                                onClick={handleEdit}
                            />
                            <CustomButton
                                variant="redButton"
                                buttonText="Delete"
                                onClick={showDeletePopup}
                            />
                            <CustomButton
                                variant="indigoButton"
                                buttonText={
                                    isPending ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                            <span>Please wait!</span>
                                        </div>
                                    ) : (
                                        "Mark as Paid"
                                    )
                                }
                                onClick={handlePaid}
                                disabled={
                                    isPending
                                        ? true
                                        : invoiceData?.status !== "PENDING"
                                          ? true
                                          : false
                                }
                                extendedClass="md:w-[139px]"
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="bg-secondary-bg shadow-custom theme-transition mt-4 rounded-[8px] p-6 text-[12px] leading-[15px] tracking-[-0.25px] md:mt-6 md:p-8 lg:p-12">
                {!isMd ? (
                    <>
                        {invoiceData.id && (
                            <div>
                                <p className="text-text theme-transition font-bold">
                                    <span className="text-gray-muted">#</span>
                                    {renderId(invoiceData.id)}
                                </p>

                                <p className="text-text-secondary theme-transition mt-1 text-[12px] font-medium">
                                    {invoiceData.description}
                                </p>
                            </div>
                        )}

                        <div className="text-text-secondary theme-transition mt-[30px] flex flex-col items-start justify-center gap-1 text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                            <p>{invoiceData.street_from}</p>
                            <p>{invoiceData.city_from}</p>
                            <p>{invoiceData.postcode_from}</p>
                            <p>{invoiceData.country_from}</p>
                        </div>
                    </>
                ) : (
                    <div className="flex items-start justify-between">
                        {invoiceData.id && (
                            <div>
                                <p className="text-text theme-transition text-[16px] leading-[24px] font-bold tracking-[-0.8px]">
                                    <span className="text-gray-muted">#</span>
                                    {renderId(invoiceData.id)}
                                </p>

                                <p className="text-text-secondary theme-transition mt-2 text-[12px] font-medium">
                                    {invoiceData.description}
                                </p>
                            </div>
                        )}

                        <div className="text-text-secondary theme-transition flex flex-col items-end justify-center gap-1 text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                            <p>{invoiceData.street_from}</p>
                            <p>{invoiceData.city_from}</p>
                            <p>{invoiceData.postcode_from}</p>
                            <p>{invoiceData.country_from}</p>
                        </div>
                    </div>
                )}

                <div className="mt-8 grid grid-cols-[100px_1fr] gap-[42px] md:mt-5 md:grid-cols-[100px_auto_1fr] md:gap-[98px] lg:gap-20">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-text-secondary theme-transition font-medium">
                                Invoice Date
                            </p>

                            <p className="text-text theme-transition mt-3 text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                                {format(
                                    new Date(invoiceData.invoice_date),
                                    "dd MMM yyyyy"
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-text-secondary theme-transition font-medium">
                                Payment Due
                            </p>

                            <p className="text-text theme-transition mt-3 text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                                {invoiceData.due_date &&
                                    format(
                                        new Date(invoiceData.due_date),
                                        "dd MMM yyyyy"
                                    )}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-text-secondary theme-transition font-medium">
                            Bill To
                        </p>

                        <p className="text-text theme-transition mt-3 text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                            {invoiceData.client_name}
                        </p>

                        <div className="text-text-secondary theme-transition mt-3 flex flex-col items-start justify-center gap-1 text-[11px] leading-[18px] font-medium tracking-[-0.23px] md:mt-2">
                            <p>{invoiceData.street_to}</p>
                            <p>{invoiceData.city_to}</p>
                            <p>{invoiceData.postcode_to}</p>
                            <p>{invoiceData.country_to}</p>
                        </div>
                    </div>

                    <div className="hidden md:mt-0 md:block">
                        <p className="text-text-secondary theme-transition font-medium">
                            Sent to
                        </p>
                        <p className="text-text theme-transition mt-3 text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                            {invoiceData.client_email}
                        </p>
                    </div>
                </div>

                <div className="mt-8 md:hidden">
                    <p className="text-text-secondary theme-transition font-medium">
                        Sent to
                    </p>
                    <p className="text-text theme-transition mt-3 text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                        {invoiceData.client_email}
                    </p>
                </div>

                {isMd ? (
                    <ItemsBoxMedium
                        items={invoiceData.items}
                        total={invoiceData.total}
                    />
                ) : (
                    <ItemsBoxSmall
                        items={invoiceData.items}
                        total={invoiceData.total}
                    />
                )}
            </div>
        </div>
    );
}
