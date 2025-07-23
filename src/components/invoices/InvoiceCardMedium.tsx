import RightArrowIcon from "@/assets/icon-arrow-right.svg";
import { InvoiceBrief } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { truncate } from "@/utils/truncate";
import { format } from "date-fns";
import { JSX } from "react";
import StatusBox from "../common/StatusBox";

export default function InvoiceCardMedium({
    invoice,
    handleClick,
}: {
    invoice: InvoiceBrief;
    handleClick: (_invoiceId: string) => void;
}): JSX.Element {
    return (
        <div
            onClick={() => handleClick(invoice.id)}
            id={`invoiceCard-${invoice.id}`}
            className="shadow-custom theme-transition text-text bg-secondary-bg hover:border-indigo-primary grid h-18 w-full cursor-pointer grid-cols-[85px_120px_1fr_1fr_143px] items-center justify-center rounded-[8px] border border-transparent pr-8 pl-6 lg:px-8"
        >
            <h2 className="text-gray-steel theme-transition dark:text-gray-soft text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                <span className="text-gray-muted">#</span>
                {renderId(invoice.id)}
            </h2>

            <p className="text-gray-muted theme-transition dark:text-gray-soft text-[12px] leading-[15px] font-medium tracking-[-0.25]">
                Due {format(new Date(invoice.due_date), "dd MMM yyyy")}
            </p>

            <p className="text-gray-cool theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px] dark:text-white">
                {truncate(invoice.client_name, 30)}
            </p>

            <p className="text-text theme-transition justify-self-end pr-10 text-[16px] leading-[24px] font-bold tracking-[-0.25px]">
                £ {invoice.total.toFixed(2)}
            </p>

            <div className="flex items-center justify-between">
                <StatusBox invoiceStatus={invoice.status} />

                <RightArrowIcon />
            </div>
        </div>
    );
}
