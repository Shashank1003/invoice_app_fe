"use client";
import { deleteInvoice, getInvoiceById, getInvoices } from "@/server/invoices";
import { InvoiceBrief, InvoiceDetailed } from "@/types/invoiceTypes";
import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
    UseQueryResult,
} from "@tanstack/react-query";

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
        },
    });
};

// export const useCreateInvoice = (): UseMutationResult<
//     InvoiceDetailed,
//     Error,
//     any,
//     unknown
// > => {
//     const queryClient = useQueryClient();

//     return useMutation<InvoiceDetailed, Error, any, unknown>({
//         mutationFn: createInvoice,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["invoices"] });
//         },
//     });
// };
