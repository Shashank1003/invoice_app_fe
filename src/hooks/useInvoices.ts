"use client";
import { getInvoices } from "@/server/invoices";
import { InvoiceBrief } from "@/types/invoiceTypes";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useInvoices = (): UseQueryResult<InvoiceBrief[], Error> => {
    return useQuery<InvoiceBrief[], Error>({
        queryKey: ["invoices"],
        queryFn: getInvoices,
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
