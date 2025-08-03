"use client";
import CreateInvoiceButton from "@/components/common/buttons/CreateInvoiceButton";
import Dropdown from "@/components/common/Dropdown";
import { useMediaQuery } from "@react-hookz/web";
import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";

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
}: InvoiceHeaderProps): JSX.Element | null {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const isMd = useMediaQuery("(min-width: 768px)");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [activeStatus]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const handleInvoiceCreate = useCallback(() => {
        router.push("/invoices/create");
    }, [router]);

    if (!isMounted) return null;

    return (
        <div className="theme-transition mx-6 mt-8 flex items-center justify-between gap-2 md:mx-12 md:mt-14 lg:mx-0 lg:mt-18">
            <div>
                <h1 className="text-text theme-transition text-[20px] leading-normal font-bold tracking-[-0.63px] md:text-[32px] md:tracking-[-1px] lg:tracking-[-1px]">
                    Invoices
                </h1>
                <p className="text-gray-steel dark:text-gray-soft theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px]">
                    <span className="block md:hidden">
                        {totalInvoices} invoices
                    </span>
                    <span className="hidden md:block">
                        There are {totalInvoices} total invoices
                    </span>
                </p>
            </div>

            <div className="flex items-center justify-between gap-[18px] md:gap-10">
                <Dropdown
                    value={activeStatus}
                    open={isOpen}
                    onToggle={toggleDropdown}
                    onChange={onOptionClick}
                    options={STATUS_VALS}
                    type="FILTER"
                    id="filterDropdown"
                    onForceClose={() => setIsOpen(false)}
                    label={isMd ? "Filter by status" : "Filter"}
                />
                <CreateInvoiceButton onClick={handleInvoiceCreate} />
            </div>
        </div>
    );
}
