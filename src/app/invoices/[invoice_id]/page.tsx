"use client";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
import DeleteConfirmation from "@/components/invoice/DeleteConfirmation";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import { useInvoiceContext } from "@/context/invoiceContext";
import {
    useDeleteInvoice,
    useFetchInvoiceById,
    useUpdateInvoice,
} from "@/hooks/useInvoices";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useQueryClient } from "@tanstack/react-query";
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
    const [invoiceData, setInvoiceData] = useState<InvoiceDetailed | null>(
        null
    );

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

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Menubar />

            <BackButton onClick={handleBack} />

            {invoiceData && <InvoiceDetails invoiceData={invoiceData} />}

            <div className="bg-secondary-bg flex h-[91px] items-center justify-between px-[24px]">
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
                    buttonText={isPending ? "Marking..." : "Mark as Paid"}
                    onClick={handlePaid}
                    disabled={invoiceData?.status !== "PENDING"}
                />
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
