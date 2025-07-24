"use client";

import NoInvoiceImg from "@/assets/illustration-empty.svg";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import InvoiceCardMedium from "@/components/invoices/InvoiceCardMedium";
import InvoiceCardSmall from "@/components/invoices/InvoiceCardSmall";
import InvoiceHeader from "@/components/invoices/InvoiceHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useFetchInvoices } from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceBrief } from "@/types/invoiceTypes";
import { toCapitalized } from "@/utils/toCapitalized";
import { useMediaQuery } from "@react-hookz/web";
import { useRouter } from "next/navigation"; // ✅ App Router
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Invoices(): JSX.Element {
    const router = useRouter();
    const { data, isLoading } = useFetchInvoices();
    const { invoices, setInvoices, scrollToId, setScrollToId } =
        useInvoiceContext();
    const [invoiceData, setInvoiceData] = useState<InvoiceBrief[]>([]);
    const [activeStatus, setActiveStatus] = useState<string>("");
    const [totalInvoices, setTotalInvoices] = useState<number>(0);
    const isFirstRender = useRef(true);
    const isMd = useMediaQuery("(min-width: 768px)");

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
        const savedIdFromSession = sessionStorage.getItem("scrollToId");
        const shouldScroll = sessionStorage.getItem("shouldScroll") === "true";

        // Clear it *now* so reloads or second visits don't use it again
        sessionStorage.removeItem("scrollToId");
        sessionStorage.removeItem("shouldScroll");

        const savedId = scrollToId || savedIdFromSession;

        if (!savedId || !shouldScroll) return;

        const maxAttempts = 20;
        let attempts = 0;

        const scroll = () => {
            const element = document.getElementById(`invoiceCard-${savedId}`);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                setScrollToId(null);
            } else if (attempts < maxAttempts) {
                attempts += 1;
                setTimeout(scroll, 100);
            }
        };

        scroll();
    }, [scrollToId]);

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
        <div className="theme-transition w-full lg:flex lg:flex-col lg:items-center lg:justify-center">
            <MenubarSmall extendedCls="lg:hidden" />
            <MenubarLarge extendedCls="hidden lg:flex" />

            <div className="lg:w-full lg:max-w-215 lg:pl-26">
                <InvoiceHeader
                    onOptionClick={handleStatus}
                    activeStatus={activeStatus}
                    totalInvoices={totalInvoices}
                />

                {isLoading ? (
                    <>
                        <div className="mt-8 flex items-center justify-between px-6 md:mt-16 md:px-12 lg:mt-18 lg:px-0">
                            <div className="bg-skeleton theme-transition h-11 w-20 rounded-[8px] md:h-16 md:w-34" />

                            <div className="bg-skeleton theme-transition h-11 w-43 rounded-[8px] md:h-16 md:w-70" />
                        </div>
                        <div className="mt-8 flex flex-col items-center justify-center gap-4 px-6 md:mt-14 md:px-12 lg:mt-18 lg:px-0">
                            {Array.from({
                                length: 10,
                            }).map((_, i) => {
                                return (
                                    <Skeleton
                                        key={i}
                                        className="bg-skeleton theme-transition h-[134px] w-full rounded-[8px] md:h-18"
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : !invoiceData || invoiceData?.length === 0 ? (
                    <div
                        style={{ height: `calc(100vh - 180px)` }}
                        className="flex flex-col items-center justify-center gap-10"
                    >
                        <NoInvoiceImg />

                        <div>
                            <p className="text-text theme-transition theme-transition text-[20px] leading-normal font-bold tracking-[-0.63px]">
                                There is nothing here
                            </p>

                            <p className="text-gray-steel theme-transition dark:text-gray-soft tracking-[-0.25px mt-6 flex flex-col items-center justify-center text-[12px] leading-[15px] font-medium">
                                <span>Create an invoice by clicking the</span>
                                <span>
                                    <span className="font-bold">New</span>{" "}
                                    button and get started
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="mx-6 mt-8 mb-6 flex flex-col items-center justify-center gap-4 md:mx-12 md:mt-14 md:mb-12 lg:mx-0 lg:mt-16 lg:mb-14">
                        {invoiceData &&
                            invoiceData.map((invoice: InvoiceBrief) =>
                                isMd ? (
                                    <InvoiceCardMedium
                                        key={invoice.id}
                                        invoice={invoice}
                                        handleClick={handleClick}
                                    />
                                ) : (
                                    <InvoiceCardSmall
                                        key={invoice.id}
                                        invoice={invoice}
                                        handleClick={handleClick}
                                    />
                                )
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}
