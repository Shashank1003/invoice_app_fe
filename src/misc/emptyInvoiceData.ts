import { format } from "date-fns";
import { v4 as uuid4 } from "uuid";

export const emptyInvoiceData = {
    client_name: "",
    client_email: "",
    description: "",
    payment_terms: "THIRTY",
    invoice_date: format(new Date(), "yyyy-MM-dd"),
    street_from: "",
    city_from: "",
    postcode_from: "",
    country_from: "",
    street_to: "",
    city_to: "",
    postcode_to: "",
    country_to: "",
    items: [
        { id: `temp_${uuid4()}`, name: "", price: 0, quantity: 0, total: 0 },
    ],
    status: "PENDING",
    total: 1,
};
