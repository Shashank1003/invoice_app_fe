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
            className="mt-8 ml-6 flex cursor-pointer items-center justify-center gap-4 p-1 pl-0 md:mt-12 md:ml-10 md:gap-6"
        >
            <LeftIcon className="h-3 w-3" />
            <span className="text-text text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                Go Back
            </span>
        </button>
    );
}
