import LeftArrow from "@/assets/icon-arrow-left.svg";
import RightArrow from "@/assets/icon-arrow-right.svg";
import { JSX } from "react";
import YearSelect from "./YearSelect";

type DateHeaderProps = {
    date: Date;
    changeMonth: (_month: number) => void;
    changeYear: (_year: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled?: boolean;
    nextMonthButtonDisabled?: boolean;
};

const DateHeader = ({
    date,
    changeYear,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}: DateHeaderProps): JSX.Element => {
    const years = Array.from(
        { length: 50 },
        (_, i) => date.getFullYear() - 25 + i
    );

    return (
        <div className="text-calender-text theme-transition flex items-center justify-between px-2 pt-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
            <button
                onClick={decreaseMonth}
                className="cursor-pointer p-1"
                disabled={prevMonthButtonDisabled}
            >
                <LeftArrow />
            </button>

            <div>
                <YearSelect
                    selectedDate={date}
                    onChange={e => changeYear(Number(e))}
                    options={years}
                />
            </div>

            <button
                onClick={increaseMonth}
                className="cursor-pointer p-1"
                disabled={nextMonthButtonDisabled}
            >
                <RightArrow />
            </button>
        </div>
    );
};

export default DateHeader;
