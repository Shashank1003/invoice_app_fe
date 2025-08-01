"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import MenubarLarge from "@/components/common/menubar/MenubarLarge";
import MenubarSmall from "@/components/common/menubar/MenubarSmall";
import DeleteConfirmation from "@/components/invoice/DeleteConfirmation";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useInvoiceContext } from "@/context/invoiceContext";
import {
    useDeleteInvoice,
    useFetchInvoiceById,
    useUpdateInvoice,
} from "@/hooks/useInvoices";
import { useLockScroll } from "@/hooks/useLockScroll";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useMediaQuery } from "@react-hookz/web";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";

export default function InvoicePage(): JSX.Element {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const invoiceId = params.invoice_id as string;
    const { setActiveInvoice, setScrollToId } = useInvoiceContext();
    const { data, isLoading } = useFetchInvoiceById(invoiceId);
    const { mutate: deleteInvoice } = useDeleteInvoice();
    const { mutate: updateInvoice, isPending } = useUpdateInvoice();
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const isMd = useMediaQuery("(min-width: 768px)");
    const [invoiceData, setInvoiceData] = useState<InvoiceDetailed | null>(
        null
    );

    useLockScroll(isLoading);

    useEffect(() => {
        if (!data || !invoiceId) return;
        setInvoiceData(data || null);
        setActiveInvoice(data || null);
        setScrollToId(invoiceId);
        queryClient.setQueryData(["invoice", invoiceId], data);
    }, [data, setActiveInvoice, invoiceId, queryClient, setScrollToId]);

    const handleBack = useCallback(() => {
        // Can use router.back() as well but it won't work if user
        // directly navigates to this page from bookmarks or other sites
        const id = invoiceData?.id;
        sessionStorage.setItem("scrollToId", id ?? "");
        sessionStorage.setItem("shouldScroll", "true");
        setScrollToId(id ?? null);
        router.push("/invoices");
    }, [router, invoiceData, setScrollToId]);

    const handleCancel = useCallback(() => {
        setIsDeletePopup(false);
    }, []);

    const handleDelete = useCallback(() => {
        deleteInvoice(invoiceId);
        router.push("/invoices");
    }, [deleteInvoice, invoiceId, router]);

    const handleEdit = useCallback(() => {
        router.push(`/invoices/${invoiceId}/edit`);
    }, [invoiceId, router]);

    const handlePaid = useCallback(() => {
        if (!invoiceData) return;

        const payload = { ...invoiceData, status: "PAID" };

        updateInvoice(payload, {
            onSuccess: () => {
                setActiveInvoice(payload);
                setInvoiceData(payload);
            },
        });
    }, [invoiceData, setActiveInvoice, setInvoiceData, updateInvoice]);

    return (
        <div className="theme-transition relative w-full lg:flex lg:flex-col lg:items-center lg:justify-center">
            <MenubarSmall extendedCls="lg:hidden" />
            <MenubarLarge extendedCls="hidden lg:flex" />

            <div className="lg:w-full lg:max-w-215 lg:pl-26">
                <BackButton onClick={handleBack} />

                {isLoading ? (
                    <div className="mt-8 px-6 md:mt-26 md:px-10 lg:mt-10">
                        <Skeleton className="bg-skeleton theme-transition h-[90px] w-full rounded-[8px] md:h-22" />
                        <Skeleton className="bg-skeleton theme-transition mt-4 h-[700px] w-full rounded-[8px]" />
                    </div>
                ) : (
                    <div>
                        {invoiceData && (
                            <InvoiceDetails
                                invoiceData={invoiceData}
                                handleEdit={handleEdit}
                                showDeletePopup={() => setIsDeletePopup(true)}
                                isPending={isPending}
                                handlePaid={handlePaid}
                            />
                        )}

                        {!isMd && (
                            <div
                                className={clsx(
                                    "bg-secondary-bg theme-transition shadow-custom flex h-[91px] items-center justify-between px-6"
                                )}
                            >
                                <CustomButton
                                    variant="button3"
                                    buttonText="Edit"
                                    onClick={handleEdit}
                                />
                                <CustomButton
                                    variant="redButton"
                                    buttonText="Delete"
                                    onClick={() => setIsDeletePopup(true)}
                                />
                                <CustomButton
                                    variant="indigoButton"
                                    buttonText={
                                        isPending ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="theme-transition h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
                                                <span>Please wait!</span>
                                            </div>
                                        ) : (
                                            "Mark as Paid"
                                        )
                                    }
                                    onClick={handlePaid}
                                    disabled={
                                        isPending
                                            ? true
                                            : invoiceData?.status !== "PENDING"
                                              ? true
                                              : false
                                    }
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isDeletePopup && (
                <DeleteConfirmation
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
