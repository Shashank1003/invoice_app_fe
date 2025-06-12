import axios from "@/lib/axios";
import api from "@/misc/api";
import { InvoiceBrief } from "@/types/invoiceTypes";
import { AxiosResponse } from "axios";

export const getInvoices = async (): Promise<InvoiceBrief[]> => {
    const resp: AxiosResponse<InvoiceBrief[]> = await axios.get(api.invoices);
    return resp.data;
};

// export const createInvoice = async (data: any) => {
//     const response = await axios.post("/invoices", data);
//     return response.data;
// };
