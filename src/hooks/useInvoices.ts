"use client";
import {
    createInvoice,
    deleteInvoice,
    getInvoiceById,
    getInvoices,
    updateInvoice,
} from "@/server/invoices";
import { InvoiceBrief, InvoiceDetailed } from "@/types/invoiceTypes";
import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchInvoices = (): UseQueryResult<InvoiceBrief[], Error> => {
    return useQuery<InvoiceBrief[], Error>({
        queryKey: ["invoices"],
        queryFn: getInvoices,
    });
};

export const useFetchInvoiceById = (
    invoiceId: string
): UseQueryResult<InvoiceDetailed, Error> => {
    return useQuery<InvoiceDetailed, Error>({
        queryKey: ["invoice", invoiceId],
        queryFn: () => getInvoiceById(invoiceId),
        enabled: !!invoiceId,
        staleTime: 1000 * 60 * 5, //5 minutes cache time
    });
};

export const useDeleteInvoice = (): UseMutationResult<
    { success: boolean },
    Error,
    string
> => {
    const QueryClient = useQueryClient();

    return useMutation<{ success: boolean }, Error, string>({
        mutationFn: deleteInvoice,
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice deleted successfully");
        },
    });
};

export const useCreateInvoice = (): UseMutationResult<
    InvoiceDetailed,
    Error,
    InvoiceDetailed,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation<InvoiceDetailed, Error, InvoiceDetailed, unknown>({
        mutationFn: payload => createInvoice(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            toast.success("Invoice created successfully");
        },
        onError: error => {
            console.log("error while creating invoice - ", error);
            toast.error("Something went wrong!");
        },
    });
};

export const useUpdateInvoice = (): UseMutationResult<
    InvoiceDetailed,
    Error,
    InvoiceDetailed
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateInvoice,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
            queryClient.invalidateQueries({
                queryKey: ["invoice", variables.id],
            });
            toast.success("Invoice updated successfully");
        },
        onError: e => {
            console.log("error while updating invoice - ", e);
            toast.error("Something went wrong!");
        },
    });
};
