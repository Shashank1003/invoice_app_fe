"use client";
import BackButton from "@/components/common/buttons/BackButton";
import CustomButton from "@/components/common/buttons/CustomButton";
import Menubar from "@/components/common/Menubar";
import InvoiceForm from "@/components/invoiceForm/InvoiceForm";
import { useInvoiceContext } from "@/context/invoiceContext";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { emptyInvoiceData } from "@/misc/emptyInvoiceData";
import { invoiceDetailedSchema } from "@/schemas/invoiceFormSchema";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { JSX, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuid4 } from "uuid";

export default function CreateNewInvoice(): JSX.Element {
    const router = useRouter();
    const { activeInvoice, setActiveInvoice } = useInvoiceContext();
    const { mutate: createInvoice, isPending } = useCreateInvoice();
    const [invoice, setInvoice] = useState<InvoiceDetailed | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (!emptyInvoiceData) return;
        setInvoice(emptyInvoiceData || null);
        setActiveInvoice(emptyInvoiceData || null);
    }, [setActiveInvoice]);

    const handleBack = useCallback(() => {
        router.push("/invoices");
    }, [router]);

    const handleFormChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const value = e.target.value;

            setInvoice(prev => {
                if (!prev) return prev;

                return { ...prev, [name as keyof InvoiceDetailed]: value };
            });
        },
        []
    );

    const handleInvoiceDateChange = useCallback((updatedDate: string) => {
        setInvoice(prev => {
            if (!prev) return prev;

            return { ...prev, invoice_date: format(updatedDate, "yyyy-MM-dd") };
        });
    }, []);

    const handlePaymentTerms = useCallback((val: string) => {
        //use if statement instead of direct type-casting as default function accepts string input
        if (
            val === "ONE" ||
            val === "SEVEN" ||
            val === "FOURTEEN" ||
            val === "THIRTY"
        ) {
            setInvoice(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    payment_terms: val as string,
                };
            });
        }
        setIsDropdownOpen(false);
    }, []);

    const handleItemsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const [field, id] = name.split(/-(.+)/);
            const value =
                field === "name" ? e.target.value : Number(e.target.value);

            //Also handle item.total if price or amount changes
            setInvoice(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    items: prev.items.map(item => {
                        if (item.id === id) {
                            const updatedItem = { ...item, [field]: value };

                            if (field !== "name") {
                                updatedItem.total =
                                    Number(updatedItem.price) *
                                    Number(updatedItem.quantity);
                            }
                            return updatedItem;
                        }
                        return item;
                    }),
                };
            });
        },
        []
    );

    const handleRemoveItem = useCallback((itemId: string) => {
        return setInvoice(prev => {
            if (!prev) return prev;

            return { ...prev, items: prev?.items.filter(x => x.id !== itemId) };
        });
    }, []);

    const handleAddItem = useCallback(() => {
        const newItem = {
            name: "",
            quantity: 1,
            price: 1,
            total: 1,
            id: `temp-${uuid4()}`,
        };
        setInvoice(prev => {
            if (!prev) return prev;
            return { ...prev, items: [...prev.items, newItem] };
        });
    }, []);

    const handleReset = useCallback(() => {
        setInvoice(activeInvoice);
    }, [activeInvoice]);

    const handleSubmit = useCallback(
        (payload: InvoiceDetailed, isDraft: boolean = false) => {
            const result = invoiceDetailedSchema.safeParse(payload);

            if (!result.success) {
                //Show all error messages in single toast
                // const messages = result.error.issues
                //     .map(issue => `• ${issue.message}`)
                //     .join("\n");
                // toast.error(messages);

                // Separate toast for each error message
                result.error.issues.forEach(issue => {
                    toast.error(issue.message);
                });
                return;
            }

            const updatedPayload = {
                ...result.data,
                status: isDraft ? "DRAFT" : "PENDING",
                items: result.data.items.map(val => {
                    if (val?.id?.startsWith("temp-")) {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const { id, ...rest } = val;
                        return rest;
                    }
                    return val;
                }),
            };
            createInvoice(updatedPayload, {
                onSuccess: data => {
                    router.push(`/invoices?scrollId=invoiceCard-${data.id}`);
                },
            });
        },
        [createInvoice, router]
    );

    return (
        <div>
            <Menubar />

            <BackButton onClick={handleBack} />

            <div className="mt-6 mb-22 px-6">
                <div className="text-text text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                    <p>New Invoice</p>
                </div>

                {invoice && (
                    <InvoiceForm
                        invoice={invoice}
                        handleChange={handleFormChange}
                        handleDateChange={handleInvoiceDateChange}
                        handlePaymentTerms={handlePaymentTerms}
                        isDropdownOpen={isDropdownOpen}
                        setIsDropdownOpen={setIsDropdownOpen}
                        isDateDisabled={false}
                        onItemChange={handleItemsChange}
                        onRemoveItem={handleRemoveItem}
                        onAddItem={handleAddItem}
                    />
                )}
            </div>

            <div className="bg-secondary-bg shadow-custom flex h-[91px] items-center justify-center gap-2 px-6">
                <CustomButton
                    buttonText="Discard"
                    onClick={handleReset}
                    variant="button3"
                    extendedClass="w-[84px]"
                />

                {invoice && (
                    <CustomButton
                        buttonText="Save as Draft"
                        onClick={() => handleSubmit(invoice, true)}
                        variant="button4"
                        extendedClass="w-[117px]"
                    />
                )}

                {invoice && (
                    <CustomButton
                        buttonText={isPending ? "Saving..." : "Save & Send"}
                        onClick={() => handleSubmit(invoice)}
                        variant="indigoButton"
                        extendedClass="w-[112px]"
                    />
                )}
            </div>
        </div>
    );
}
