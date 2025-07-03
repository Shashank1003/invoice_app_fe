import StatusBox from "@/components/common/StatusBox";
import ItemsBox from "@/components/invoice/ItemsBox";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { format } from "date-fns";
import { JSX } from "react";

export default function InvoiceDetails({
    invoiceData,
}: {
    invoiceData: InvoiceDetailed;
}): JSX.Element {
    return (
        <div className="mb-[56px] px-[24px]">
            <div className="bg-secondary-bg shadow-custom mt-[32px] flex h-[91px] items-center justify-between rounded-[8px] px-[24px]">
                <p className="text-gray-cool dark:text-gray-soft text-[12px] leading-[15px] font-medium">
                    Status
                </p>
                <StatusBox invoiceStatus={invoiceData.status} />
            </div>

            <div className="bg-secondary-bg shadow-custom mt-[16px] rounded-[8px] p-[24px] text-[12px] leading-[15px] tracking-[-0.25px]">
                {invoiceData.id && (
                    <div>
                        <p className="text-text font-bold">
                            <span className="text-gray-muted">#</span>
                            {renderId(invoiceData.id)}
                        </p>
                        <p className="text-text-secondary mt-[4px] text-[12px] font-medium">
                            {invoiceData.description}
                        </p>
                    </div>
                )}

                <div className="text-text-secondary mt-[30px] flex flex-col items-start justify-center gap-[4px] text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                    <p>{invoiceData.street_from}</p>
                    <p>{invoiceData.city_from}</p>
                    <p>{invoiceData.postcode_from}</p>
                    <p>{invoiceData.country_from}</p>
                </div>

                <div className="mt-[31px] grid grid-cols-[auto_1fr] gap-[42px]">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-text-secondary font-medium">
                                Invoice Date
                            </p>
                            <p className="text-text mt-[12px] text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                                {format(
                                    new Date(invoiceData.invoice_date),
                                    "dd MMM yyyyy"
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-text-secondary font-medium">
                                Payment Due
                            </p>
                            <p className="text-text mt-[12px] text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                                {invoiceData.due_date &&
                                    format(
                                        new Date(invoiceData.due_date),
                                        "dd MMM yyyyy"
                                    )}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-text-secondary font-medium">
                            Bill To
                        </p>
                        <p className="text-text mt-[12px] text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                            {invoiceData.client_name}
                        </p>
                        <div className="text-text-secondary mt-[8px] flex flex-col items-start justify-center gap-[4px] text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                            <p>{invoiceData.street_to}</p>
                            <p>{invoiceData.city_to}</p>
                            <p>{invoiceData.postcode_to}</p>
                            <p>{invoiceData.country_to}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-[32px]">
                    <p className="text-text-secondary font-medium">Sent to</p>
                    <p className="text-text mt-[12px] text-[15px] leading-[20px] font-bold tracking-[-0.31px]">
                        {invoiceData.client_email}
                    </p>
                </div>

                <ItemsBox items={invoiceData.items} total={invoiceData.total} />
            </div>
        </div>
    );
}
