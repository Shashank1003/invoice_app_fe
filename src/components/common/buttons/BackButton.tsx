import LeftIcon from "@/assets/icon-arrow-left.svg";
import { JSX } from "react";

export default function BackButton({
    onClick,
}: {
    onClick: () => void;
}): JSX.Element {
    return (
        <button
            onClick={onClick}
            className="mt-[32px] ml-[24px] flex items-center justify-center gap-[16px]"
        >
            <LeftIcon className="h-[12px] w-[12px]" />
            <span className="text-text text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                Go Back
            </span>
        </button>
    );
}
