import { InvoiceBrief } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { numberFormatter } from "@/utils/numberFormatter";
import { truncate } from "@/utils/truncate";
import { format } from "date-fns";
import { JSX } from "react";
import StatusBox from "../common/StatusBox";

export default function InvoiceCardSmall({
    invoice,
    handleClick,
}: {
    invoice: InvoiceBrief;
    handleClick: (_invoiceId: string) => void;
}): JSX.Element {
    return (
        <div
            id={`invoiceCard-${invoice.id}`}
            onClick={() => handleClick(invoice.id)}
            className="shadow-custom text-text bg-secondary-bg hover:border-indigo-primary theme-transition flex h-[134px] w-full cursor-pointer flex-col items-center justify-between rounded-[8px] border border-transparent px-6"
        >
            <div className="mt-6 flex w-full items-center justify-between">
                <h2 className="text-[12px] leading-[15px] font-bold">
                    <span className="text-gray-muted">#</span>
                    <span>{renderId(invoice.id)}</span>
                </h2>
                <p className="text-gray-cool theme-transition text-[12px] leading-[15px] font-medium dark:text-white">
                    {truncate(invoice.client_name, 20)}
                </p>
            </div>

            <div className="mb-6 flex w-full items-end justify-between gap-2">
                <div className="flex flex-col items-start justify-center gap-2">
                    <p className="text-gray-muted theme-transition dark:text-gray-soft text-[12px] leading-[15px] font-medium">
                        <span className="text-gray-steel theme-transition dark:text-gray-soft">
                            Due
                        </span>
                        {format(new Date(invoice.due_date), "dd MMMM yyyy")}
                    </p>
                    <p className="text-text theme-transition text-[16px] leading-[24px] font-bold">
                        {numberFormatter(invoice.total, { type: "currency" })}
                    </p>
                </div>

                <StatusBox invoiceStatus={invoice.status} />
            </div>
        </div>
    );
}
