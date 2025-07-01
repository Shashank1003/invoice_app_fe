import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";
import CreateInvoiceButton from "../common/buttons/CreateInvoiceButton";

interface InvoiceHeaderProps {
    activeStatus: string;
    onOptionClick: (_status: string) => void;
    totalInvoices: number;
}

const STATUS_VALS = ["DRAFT", "PENDING", "PAID"];

export default function InvoiceHeader({
    activeStatus,
    onOptionClick,
    totalInvoices,
}: InvoiceHeaderProps): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsOpen(false);
    }, [activeStatus]);

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleInvoiceCreate = useCallback(() => {
        router.push("/invoices/create");
    }, [router]);

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
                    onToggle={toggleDropdown}
                    onChange={onOptionClick}
                    options={STATUS_VALS}
                    type="FILTER"
                    id="filterDropdown"
                    onForceClose={() => setIsOpen(false)}
                />
                <CreateInvoiceButton onClick={handleInvoiceCreate} />
            </div>
        </div>
    );
}
