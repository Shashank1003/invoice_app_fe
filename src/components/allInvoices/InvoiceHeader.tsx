import { JSX, useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";
import CreateInvoiceButton from "../common/buttons/CreateInvoiceButton";

interface InvoiceHeaderProps {
    activeStatus: string;
    onOptionClick: (status: string) => void;
    totalInvoices: number;
}

export default function InvoiceHeader({
    activeStatus,
    onOptionClick,
    totalInvoices,
}: InvoiceHeaderProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [activeStatus]);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="mx-[24px] mt-[32px] flex items-center justify-between">
            <div>
                <h1 className="text-text text-[20px] leading-normal font-bold text-gray-900">
                    Invoices
                </h1>
                <p className="text-gray-steel dark:text-gray-soft text-[12px] leading-[12px] font-medium">
                    {totalInvoices} invoices
                </p>
            </div>

            <div className="flex items-center justify-between gap-[18px]">
                <Dropdown
                    value={activeStatus}
                    open={isOpen}
                    onClick={toggleDropdown}
                    onOptionClick={onOptionClick}
                />
                <CreateInvoiceButton />
            </div>
        </div>
    );
}
