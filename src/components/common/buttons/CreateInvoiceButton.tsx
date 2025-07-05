"use client";
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
            className="bg-indigo-primary hover:bg-indigo-hover flex cursor-pointer items-center justify-between gap-2 rounded-[24px] py-[6px] pr-4 pl-[6px] md:gap-4 md:py-2 md:pl-2"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <PlusIcon />
            </div>
            <span className="text-[12px] leading-[15px] font-bold tracking-[-0.25px] text-white">
                <span className="block md:hidden">New</span>
                <span className="hidden md:block">New Invoice</span>
            </span>
        </button>
    );
}
