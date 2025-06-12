import { useThemeContext } from "@/context/themeContext";
import { statusColors } from "@/misc/statusColors";
import { InvoiceBrief } from "@/types/invoiceTypes";
import { renderId } from "@/utils/generateRenderId";
import { toCapitalized } from "@/utils/toCapitalized";
import moment from "moment";
import { JSX } from "react";

interface StatusColorsInterface {
    background: string;
    color: string;
}

export default function InvoiceCard({
    invoice,
}: {
    invoice: InvoiceBrief;
}): JSX.Element {
    const { isDarkMode } = useThemeContext();

    const getStatusColors = (status: string): StatusColorsInterface => {
        if (status in statusColors) {
            if (status === "DRAFT" && isDarkMode) {
                return {
                    background: statusColors.DRAFT.backgroundDark,
                    color: statusColors.DRAFT.colorDark,
                };
            }
            return statusColors[status as keyof typeof statusColors];
        }
        return {
            background: "transparent",
            color: "#000", // Fallback color
        };
    };

    return (
        <div className="shadow-custom text-text bg-secondary-bg flex h-[134px] w-full flex-col items-center justify-between rounded-[8px] px-[24px]">
            <div className="mt-[24px] flex w-full items-center justify-between">
                <h2 className="text-[12px] leading-[15px] font-bold">
                    <span className="text-gray-muted">#</span>
                    <span>{renderId(invoice.id)}</span>
                </h2>
                <p className="text-gray-cool text-[12px] leading-[15px] font-medium dark:text-white">
                    {invoice.client_name}
                </p>
            </div>

            <div className="mb-[24px] flex w-full items-end justify-between gap-[8px]">
                <div className="flex flex-col items-start justify-center gap-[8px]">
                    <p className="text-gray-muted dark:text-gray-soft text-[12px] leading-[15px] font-medium">
                        <span className="text-gray-steel dark:text-gray-soft">
                            Due
                        </span>
                        {moment(invoice.due_date).format(" DD MMM YYYY")}
                    </p>
                    <p className="text-text text-[16px] leading-[24px] font-bold">
                        £ {invoice.total.toFixed(2)}
                    </p>
                </div>

                <div
                    style={{
                        background: getStatusColors(invoice.status)?.background,
                        color: getStatusColors(invoice.status)?.color,
                    }}
                    className="flex h-[40px] w-[104px] items-center justify-center gap-[8px] rounded-[6px] text-[12px] leading-[15px] font-bold"
                >
                    <span
                        style={{
                            background: getStatusColors(invoice.status)?.color,
                        }}
                        className="h-[8px] w-[8px] rounded-full"
                    />
                    <span>{toCapitalized(invoice.status)}</span>
                </div>
            </div>
        </div>
    );
}
