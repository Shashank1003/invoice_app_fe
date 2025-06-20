"use client";
import LeftIcon from "@/assets/icon-arrow-left.svg";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
import DeleteConfirmation from "@/components/invoice/DeleteConfirmation";
import InvoiceDetails from "@/components/invoice/InvoiceDetails";
import { useDeleteInvoice, useFetchInvoiceById } from "@/hooks/useInvoices";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { useParams, useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";

export default function InvoicePage(): JSX.Element {
    const params = useParams();
    const router = useRouter();
    const invoiceId = params.invoice_id as string;
    const { data, isLoading } = useFetchInvoiceById(invoiceId);
    const { mutate: deleteInvoice } = useDeleteInvoice();
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceDetailed | null>(
        null
    );

    useEffect(() => {
        if (!data) return;
        setInvoiceData(data || null);
    }, [data]);

    const handleCancel = useCallback(() => {
        setIsDeletePopup(false);
    }, []);

    const handleDelete = useCallback(() => {
        deleteInvoice(invoiceId);
        router.back();
    }, [deleteInvoice, invoiceId, router]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <Menubar />

            <button
                onClick={() => router.back()}
                className="mt-[32px] ml-[24px] flex items-center justify-center gap-[16px]"
            >
                <LeftIcon className="h-[12px] w-[12px]" />
                <span className="text-text text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                    Go Back
                </span>
            </button>

            {invoiceData && <InvoiceDetails invoiceData={invoiceData} />}

            <div className="bg-secondary-bg flex h-[91px] items-center justify-between px-[24px]">
                <CustomButton
                    variant="button3"
                    buttonText="Edit"
                    onClick={() => console.log("Edit")}
                />
                <CustomButton
                    variant="redButton"
                    buttonText="Delete"
                    onClick={() => setIsDeletePopup(true)}
                />
                <CustomButton
                    variant="indigoButton"
                    buttonText="Mark as Paid"
                    onClick={() => console.log("paid")}
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
