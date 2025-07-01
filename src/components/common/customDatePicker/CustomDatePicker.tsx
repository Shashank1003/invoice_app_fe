import "@/styles/datepicker.css";
import { computePosition, offset } from "@floating-ui/react";
import clsx from "clsx";
import { format } from "date-fns";
import React, { JSX, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateHeader from "./DateHeader";
import DateInput from "./DateInput";

export default function CustomDatePicker({
    invoiceDate,
    disabled = false,
    updateInvoiceDate,
}: {
    invoiceDate: string;
    disabled?: boolean;
    updateInvoiceDate: (_date: string) => void;
}): JSX.Element {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        setSelectedDate(new Date(invoiceDate));
    }, [invoiceDate]);

    const handleDateChange = useCallback(
        (date: Date | null) => {
            setSelectedDate(date);
            if (date) {
                updateInvoiceDate(format(new Date(date), "yyyy-MM-dd"));
            }
        },
        [updateInvoiceDate]
    );

    return (
        <div
            className={clsx(
                "relative flex w-full flex-col gap-[10px]",
                disabled && "opacity-50"
            )}
        >
            <label
                htmlFor="invoice_date"
                className="text-form-label text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
            >
                Invoice Date
            </label>

            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                customInput={<DateInput isDisabled={disabled} />}
                showPopperArrow={false}
                shouldCloseOnSelect
                disabled={disabled}
                popperClassName="w-full shadow-dd-light dark:shadow-dd-dark"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                renderCustomHeader={props => <DateHeader {...props} />}
                closeOnScroll={false}
                popperModifiers={[
                    {
                        name: "myModifier",
                        async fn(state) {
                            const { floating, reference } = state.elements;
                            const newPos = await computePosition(
                                reference,
                                floating,
                                {
                                    placement: state.placement,
                                    middleware: [offset(12)],
                                }
                            );
                            state = {
                                ...state,
                                strategy: newPos.strategy,
                                x: newPos.x,
                                y: newPos.y,
                                middlewareData: {
                                    ...state.middlewareData,
                                    offset: newPos.middlewareData.offset,
                                },
                            };
                            return state;
                        },
                    },
                ]}
            />
        </div>
    );
}
