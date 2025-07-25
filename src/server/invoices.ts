import axios from "@/lib/axios";
import api from "@/misc/api";
import { InvoiceBrief, InvoiceDetailed } from "@/types/invoiceTypes";
import { AxiosResponse } from "axios";

export const getInvoices = async (): Promise<InvoiceBrief[]> => {
    const resp: AxiosResponse<InvoiceBrief[]> = await axios.get(api.invoices);
    return resp.data;
};

export const getInvoiceById = async (id: string): Promise<InvoiceDetailed> => {
    const resp: AxiosResponse<InvoiceDetailed> = await axios.get(
        `${api.invoices}/${id}`
    );
    return resp.data;
};

export const deleteInvoice = async (
    id: string
): Promise<{ success: boolean }> => {
    const resp = await axios.delete(`${api.invoices}/${id}`);
    return resp.data;
};

export const createInvoice = async (
    payload: InvoiceDetailed
): Promise<InvoiceDetailed> => {
    const resp: AxiosResponse<InvoiceDetailed> = await axios.post(
        "/invoices",
        payload
    );
    return resp.data;
};

export const updateInvoice = async (
    payload: InvoiceDetailed
): Promise<InvoiceDetailed> => {
    const resp: AxiosResponse<InvoiceDetailed> = await axios.put(
        `${api.invoices}/${payload.id}`,
        payload
    );
    return resp.data;
};
