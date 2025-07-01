import { Item } from "./itemTypes";

export interface InvoiceDetailed {
    id?: string;
    due_date?: string;
    client_name: string;
    client_email: string;
    street_from: string;
    street_to: string;
    city_from: string;
    city_to: string;
    postcode_from: string;
    postcode_to: string;
    country_from: string;
    country_to: string;
    invoice_date: string;
    status: string;
    payment_terms: string;
    description: string;
    total: number;
    items: Item[];
}

export interface InvoiceBrief {
    id: string;
    due_date: string;
    status: string;
    total: number;
    client_name: string;
}
