"use client";

import { format } from "date-fns";
import { JSX, useEffect, useRef, useState } from "react";

type YearSelectProps = {
    options: number[];
    selectedDate: Date;
    onChange: (_option: number) => void;
};

export default function YearSelect({
    options,
    selectedDate,
    onChange,
}: YearSelectProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document
                .getElementById(`year${selectedDate.getFullYear()}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isOpen, selectedDate]);

    return (
        <div className="relative w-full px-4" ref={wrapperRef}>
            <button
                type="button"
                className="!text-indigo-primary hover:!bg-calender-bg hover:!text-indigo-hover theme-transition cursor-pointer text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                {format(selectedDate, "MMMM yyyy")}
            </button>

            {isOpen && (
                <ul className="shadow-dd-light theme-transition dark:shadow-dd-dark dark:bg-gray-deep text-text absolute left-1/2 z-10 mt-2 max-h-[180px] w-full -translate-x-1/2 overflow-auto rounded-[8px] bg-white font-bold">
                    {options.map((option: number) => (
                        <li
                            key={option}
                            id={`year${option}`}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            <p
                                className={`hover:dark:bg-slate-blue hover:bg-gray-soft theme-transition cursor-pointer px-4 py-2 ${
                                    option === selectedDate.getFullYear()
                                        ? "text-indigo-primary font-bold"
                                        : ""
                                }`}
                            >
                                {option}
                            </p>
                            <div className="border-gray-soft theme-transition dark:border-gray-ink h-[1px] w-full border" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
