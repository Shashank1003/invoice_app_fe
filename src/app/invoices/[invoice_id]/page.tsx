"use client";

import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
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
    const { setActiveInvoice } = useInvoiceContext();
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
        queryClient.setQueryData(["invoice", invoiceId], data);
    }, [data, setActiveInvoice, invoiceId, queryClient]);

    const handleBack = useCallback(() => {
        // Can use router.back() as well but it won't work if user
        // directly navigates to this page from bookmarks or other sites
        if (invoiceData && invoiceData.id) {
            router.push(`/invoices?scrollId=invoiceCard-${invoiceData?.id}`);
        } else {
            router.push("/invoices");
        }
    }, [router, invoiceData]);

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
        <div>
            <Menubar />

            <BackButton onClick={handleBack} />

            {isLoading ? (
                <div className="mx-6 mt-8">
                    <Skeleton className="bg-skeleton h-[90px] w-full rounded-[8px]" />
                    <Skeleton className="bg-skeleton mt-4 h-[700px] w-full rounded-[8px]" />
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
                                "bg-secondary-bg shadow-custom flex h-[91px] items-center justify-between px-6"
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
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></div>
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

            {isDeletePopup && (
                <DeleteConfirmation
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
