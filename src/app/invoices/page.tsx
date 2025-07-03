"use client";

import InvoiceCard from "@/components/allInvoices/InvoiceCard";
import InvoiceHeader from "@/components/allInvoices/InvoiceHeader";
import Menubar from "@/components/common/Menubar";
import { Skeleton } from "@/components/ui/skeleton";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceBrief } from "@/types/invoiceTypes";
import { toCapitalized } from "@/utils/toCapitalized";
import { useRouter } from "next/navigation"; // ✅ App Router
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Invoices(): JSX.Element {
    const router = useRouter();
    const { data, isLoading } = useFetchInvoices();
    const { invoices, setInvoices } = useInvoiceContext();
    const [invoiceData, setInvoiceData] = useState<InvoiceBrief[]>([]);
    const [activeStatus, setActiveStatus] = useState<string>("");
    const [totalInvoices, setTotalInvoices] = useState<number>(0);
    const isFirstRender = useRef(true);

    useLockScroll(isLoading ? true : false);

    useEffect(() => {
        if (!data) return;
        setInvoices(data || []);
        setInvoiceData(data || []);
    }, [data, setInvoices]);

    useEffect(() => {
        const localData = invoices;
        if (activeStatus) {
            const filteredInvoices = localData?.filter(
                (invoice: InvoiceBrief) => invoice.status === activeStatus
            );
            setInvoiceData(filteredInvoices || []);
        } else {
            setInvoiceData(data || []);
        }
    }, [activeStatus, data, invoices]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (activeStatus) {
            toast.info(
                `Showing invoices marked as ${toCapitalized(activeStatus)}!`
            );
        } else {
            toast.info("Showing all invoices!");
        }
    }, [activeStatus]);

    useEffect(() => {
        setTotalInvoices(invoiceData.length);
    }, [invoiceData]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const scrollId = searchParams.get("scrollId");

        if (!scrollId) return;
        const maxAttempts = 20;
        let attempts = 0;

        const scrollToId = () => {
            const element = document.getElementById(scrollId);

            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else if (attempts < maxAttempts) {
                attempts += 1;
                setTimeout(scrollToId, 100);
            }
        };

        scrollToId();
    }, []);

    const handleStatus = useCallback(
        (status: string) => {
            if (status === activeStatus) {
                return setActiveStatus("");
            } else {
                return setActiveStatus(status);
            }
        },
        [activeStatus, setActiveStatus]
    );

    const handleClick = useCallback(
        (invoiceId: string) => {
            router.push(`/invoices/${invoiceId}`);
        },
        [router]
    );

    return (
        <div>
            <Menubar />
            <InvoiceHeader
                onOptionClick={handleStatus}
                activeStatus={activeStatus}
                totalInvoices={totalInvoices}
            />

            {isLoading ? (
                <div className="mx-6 mt-8 flex flex-col items-center justify-center gap-4">
                    {Array.from({
                        length: 10,
                    }).map((_, i) => {
                        return (
                            <Skeleton
                                key={i}
                                className="bg-skeleton h-[134px] w-full rounded-[8px]"
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="mx-[24px] mt-[32px] mb-[24px] flex flex-col items-center justify-center gap-[16px]">
                    {invoiceData &&
                        invoiceData.map((invoice: InvoiceBrief) => (
                            <InvoiceCard
                                key={invoice.id}
                                invoice={invoice}
                                handleClick={handleClick}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
