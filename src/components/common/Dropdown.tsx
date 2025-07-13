import DownIcon from "@/assets/icon-arrow-down.svg";
import CheckIcon from "@/assets/icon-check.svg";
import { useForceClose } from "@/hooks/useForceClose";
import { toCapitalized } from "@/utils/toCapitalized";
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import clsx from "clsx";
import { JSX, useRef } from "react";

interface Option {
    key: string;
    value: string;
}

interface DropdownProps {
    value: string;
    open: boolean;
    onToggle: () => void;
    onChange: (_option: string) => void;
    options: string[] | Option[];
    type: "FILTER" | "SELECT";
    id: string;
    label?: string;
    onForceClose: () => void;
    closeOnScroll?: boolean;
}

export default function Dropdown({
    value,
    open,
    onToggle,
    onChange,
    options,
    type,
    id,
    label,
    onForceClose,
    closeOnScroll = true,
}: DropdownProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useForceClose({ ref, onForceClose, closeOnScroll });

    const getValueFromKey = (val: string): string => {
        const keyVal = options.find(x => {
            if (typeof x === "object" && "key" in x) return x.key === val;
        });
        return keyVal && typeof keyVal === "object" ? keyVal.value : val;
    };

    const { refs, floatingStyles } = useFloating({
        placement: "bottom-start", // preferred, will flip if needed
        middleware: [
            offset(12), // offset the floating element by 24px
            flip(),
            // shift(state => ({ padding: state.rects.reference.width / 2 + 24 })),
        ],
    });

    return (
        <div className="relative" ref={ref}>
            {type === "FILTER" ? (
                <button
                    onClick={onToggle}
                    id={id}
                    ref={refs.setReference}
                    className="bg-bg text-text flex cursor-pointer items-center justify-between gap-3 text-[12px] leading-[15px] font-bold tracking-[-0.25px] md:gap-4"
                >
                    <span>{label}</span>
                    <DownIcon
                        className={
                            open
                                ? "rotate-180 transition-transform duration-300"
                                : "transition-transform duration-300"
                        }
                    />
                </button>
            ) : (
                <div className="flex w-full flex-col gap-[10px]">
                    <label
                        htmlFor={id}
                        className="text-form-label text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
                    >
                        {label}
                    </label>
                    <button
                        ref={refs.setReference}
                        onClick={onToggle}
                        className="bg-secondary-bg text-text border-border focus:border-indigo-primary hover:border-indigo-primary flex h-12 w-full cursor-pointer items-center justify-between rounded border px-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none"
                    >
                        <span>{getValueFromKey(value)}</span>
                        <DownIcon
                            className={
                                open
                                    ? "rotate-180 transition-transform duration-300"
                                    : "transition-transform duration-300"
                            }
                        />
                    </button>
                </div>
            )}

            {open && (
                <ul
                    ref={refs.setFloating}
                    role="listbox"
                    style={floatingStyles}
                    className={clsx(
                        "shadow-dd-light dark:shadow-dd-dark rounded-[8px]",
                        {
                            "bg-calender-bg w-full": type === "SELECT",

                            "bg-secondary-bg flex w-[120px] flex-col items-start justify-center gap-[12px] p-[20px]":
                                type === "FILTER",
                        }
                    )}
                >
                    {options.map((option, i) => {
                        return typeof option === "string" ? (
                            <li
                                key={option as string}
                                role="option"
                                aria-selected={value === option}
                                onClick={() => onChange(option as string)}
                            >
                                <button
                                    type="button"
                                    className="flex cursor-pointer items-center justify-between gap-[14px]"
                                >
                                    <div
                                        className={
                                            "border-indigo-primary flex h-[16px] w-[16px] items-center justify-center rounded-[2px] border" +
                                            (value === option
                                                ? " bg-indigo-primary"
                                                : " bg-gray-soft dark:bg-gray-ink")
                                        }
                                    >
                                        {value === option ? <CheckIcon /> : ""}
                                    </div>
                                    <div className="text-gray-ink flex items-center justify-center text-[12px] leading-[15px] font-bold dark:text-white">
                                        {toCapitalized(option as string)}
                                    </div>
                                </button>
                            </li>
                        ) : (
                            <li
                                key={option.key as string}
                                role="option"
                                aria-selected={value === option.key}
                                onClick={() => onChange(option.key as string)}
                            >
                                <button
                                    className={clsx(
                                        "hover:dark:bg-slate-blue hover:bg-gray-soft h-12 w-full cursor-pointer px-6 py-4 text-left text-[12px] leading-[15px] font-bold tracking-[-0.25px]",
                                        value === option.key
                                            ? "text-indigo-primary"
                                            : "text-calender-text"
                                    )}
                                >
                                    {toCapitalized(option.value)}
                                </button>
                                {i !== options.length - 1 && (
                                    <div className="bg-gray-soft dark:bg-gray-ink h-[1px] w-full" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
