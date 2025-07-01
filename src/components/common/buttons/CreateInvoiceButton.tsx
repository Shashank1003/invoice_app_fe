import PlusIcon from "@/assets/icon-plus.svg";
import { JSX } from "react";

export default function CreateInvoiceButton({
    onClick,
}: {
    onClick: () => void;
}): JSX.Element {
    return (
        <button
            onClick={onClick}
            className="bg-indigo-primary hover:bg-indigo-hover flex cursor-pointer items-center justify-between gap-[8px] rounded-[24px] py-[6px] pr-[15px] pl-[6px]"
        >
            <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white">
                <PlusIcon />
            </div>
            <span className="text-[12px] leading-[15px] font-bold text-white">
                New
            </span>
        </button>
    );
}
