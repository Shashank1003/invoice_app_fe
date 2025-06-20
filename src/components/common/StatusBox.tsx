import { useThemeContext } from "@/context/themeContext";
import { statusColors } from "@/misc/statusColors";
import { toCapitalized } from "@/utils/toCapitalized";
import { JSX } from "react";

interface StatusColorsInterface {
    background: string;
    color: string;
}

export default function StatusBox({
    invoiceStatus,
}: {
    invoiceStatus: string;
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
        <div
            style={{
                background: getStatusColors(invoiceStatus)?.background,
                color: getStatusColors(invoiceStatus)?.color,
            }}
            className="flex h-[40px] w-[104px] items-center justify-center gap-[8px] rounded-[6px] text-[12px] leading-[15px] font-bold"
        >
            <span
                style={{
                    background: getStatusColors(invoiceStatus)?.color,
                }}
                className="h-[8px] w-[8px] rounded-full"
            />
            <span>{toCapitalized(invoiceStatus)}</span>
        </div>
    );
}
