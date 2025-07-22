import LeftIcon from "@/assets/icon-arrow-left.svg";
import clsx from "clsx";
import { JSX } from "react";

export default function BackButton({
    onClick,
    extendedCls = "",
}: {
    onClick: () => void;
    extendedCls?: string;
}): JSX.Element {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "group theme-transition mt-8 ml-6 flex cursor-pointer items-center justify-center gap-4 p-1 pl-0 md:mt-12 md:ml-10 md:gap-6 lg:mt-16",
                extendedCls
            )}
        >
            <LeftIcon className="text-indigo-primary theme-transition group-hover:text-indigo-hover h-3 w-3" />
            <span className="text-text group-hover:text-indigo-primary theme-transition text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                Go Back
            </span>
        </button>
    );
}
