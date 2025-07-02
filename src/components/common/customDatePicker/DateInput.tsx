import CalenderIcon from "@/assets/icon-calendar.svg";
import clsx from "clsx";
import { format } from "date-fns";
import React from "react";

type DateInputProps = {
    value?: string | number | Date;
    onClick?: () => void;
    isDisabled: boolean;
};

const DateInput = React.forwardRef<HTMLButtonElement, DateInputProps>(
    ({ value, onClick, isDisabled }, ref) => (
        <button
            type="button"
            className={clsx(
                "bg-secondary-bg text-text border-border flex h-12 w-full items-center justify-between rounded border px-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none",
                {
                    "focus:border-indigo-primary hover:border-indigo-primary cursor-pointer":
                        !isDisabled,
                    "focus:border-border cursor-default": isDisabled,
                }
            )}
            onClick={onClick}
            ref={ref}
            tabIndex={isDisabled ? -1 : 0}
        >
            <span>{value ? format(value, "dd MMM yyyy") : "DD MMM YYYY"}</span>
            <CalenderIcon className="h-4 w-4" />
        </button>
    )
);

DateInput.displayName = "CustomDateInput";
export default DateInput;
