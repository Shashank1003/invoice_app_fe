import DownIcon from "@/assets/icon-arrow-down.svg";
import CheckIcon from "@/assets/icon-check.svg";
import { toCapitalized } from "@/utils/toCapitalized";
import { JSX } from "react";

interface DropdownProps {
    value: string;
    open: boolean;
    onClick: () => void;
    onOptionClick: (status: string) => void;
}

const STATUS_VALS = ["DRAFT", "PENDING", "PAID"];

export default function Dropdown({
    value,
    open,
    onClick,
    onOptionClick,
}: DropdownProps): JSX.Element {
    return (
        <div className="relative">
            <button
                onClick={onClick}
                className="bg-bg text-text flex cursor-pointer items-center justify-between gap-[12px] text-[12px] leading-[15px] font-bold"
            >
                <span>Filter</span>
                <DownIcon />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="shadow-dd-light dark:shadow-dd-dark bg-secondary-bg absolute top-[24px] left-1/2 flex w-[120px] -translate-x-1/2 flex-col items-start justify-center gap-[12px] rounded-[8px] p-[16px]"
                >
                    {STATUS_VALS.map(status => {
                        return (
                            <li
                                key={status}
                                role="option"
                                aria-selected={value === status}
                                onClick={() => onOptionClick(status)}
                            >
                                <button
                                    type="button"
                                    className="flex items-center justify-between gap-[14px]"
                                >
                                    <div
                                        className={
                                            "border-indigo-primary flex h-[16px] w-[16px] items-center justify-center rounded-[2px] border" +
                                            (value === status
                                                ? " bg-indigo-primary"
                                                : " bg-gray-soft dark:bg-gray-ink")
                                        }
                                    >
                                        {value === status ? <CheckIcon /> : ""}
                                    </div>
                                    <div className="text-gray-ink text-[12px] leading-[15px] font-bold dark:text-white">
                                        {toCapitalized(status)}
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
