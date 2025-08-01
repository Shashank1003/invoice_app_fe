import { paymentTerms } from "@/misc/paymentTerms";
import { InvoiceDetailed } from "@/types/invoiceTypes";
import { Item } from "@/types/itemTypes";
import { useMediaQuery } from "@react-hookz/web";
import clsx from "clsx";
import { format } from "date-fns";
import React, { JSX, useCallback, useState } from "react";
import { v4 as uuid4 } from "uuid";
import CustomButton from "../common/buttons/CustomButton";
import CustomDatePicker from "../common/customDatePicker/CustomDatePicker";
import CustomInput from "../common/CustomInput";
import Dropdown from "../common/Dropdown";
import ItemCardMedium from "./ItemCardMedium";
import ItemCardSmall from "./ItemCardSmall";

interface InvoiceFormProps {
    invoice: InvoiceDetailed;
    isDateDisabled: boolean;
    setInvoice: React.Dispatch<React.SetStateAction<InvoiceDetailed | null>>;
    isModal?: boolean;
}

export default function InvoiceForm({
    invoice,
    isDateDisabled,
    setInvoice,
    isModal = true,
}: InvoiceFormProps): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownOptions = Object.entries(paymentTerms).map(([key, value]) => {
        return { key: key, value: value };
    });
    const isMd = useMediaQuery("(min-width: 768px)");

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const name = e.target.name;
            const value = e.target.value;

            setInvoice(prev => {
                if (!prev) return prev;

                return { ...prev, [name as keyof InvoiceDetailed]: value };
            });
        },
        [setInvoice]
    );

    const handleDateChange = useCallback(
        (updatedDate: string) => {
            setInvoice(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    invoice_date: format(updatedDate, "yyyy-MM-dd"),
                };
            });
        },
        [setInvoice]
    );

    const handlePaymentTerms = useCallback(
        (val: string) => {
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
        },
        [setInvoice]
    );

    const onItemChange = useCallback(
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
        [setInvoice]
    );

    const onRemoveItem = useCallback(
        (itemId: string) => {
            return setInvoice(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    items: prev?.items.filter(x => x.id !== itemId),
                };
            });
        },
        [setInvoice]
    );

    const onAddItem = useCallback(() => {
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
    }, [setInvoice]);

    return (
        <div>
            <div className="mt-6 space-y-6 md:mt-12">
                <p className="text-indigo-primary theme-transition text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                    Bill From
                </p>

                <CustomInput
                    id="street_from"
                    label="Street Address"
                    type="text"
                    placeholder="19 Union Terrace"
                    value={invoice.street_from}
                    onChange={handleChange}
                />

                <div className="flex items-center justify-between gap-6">
                    <CustomInput
                        id="city_from"
                        label="City"
                        type="text"
                        placeholder="London"
                        value={invoice.city_from}
                        onChange={handleChange}
                    />

                    <CustomInput
                        id="postcode_from"
                        label="Postcode"
                        type="text"
                        placeholder="E1 3EZ"
                        value={invoice.postcode_from}
                        onChange={handleChange}
                    />

                    <div className="hidden w-full md:block">
                        <CustomInput
                            id="country_from"
                            label="Country"
                            type="text"
                            placeholder="United Kingdom"
                            value={invoice.country_from}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-full md:hidden">
                    <CustomInput
                        id="country_from"
                        label="Country"
                        type="text"
                        placeholder="United Kingdom"
                        value={invoice.country_from}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="mt-10 space-y-6 md:mt-12">
                <p className="text-indigo-primary theme-transition text-[12px] leading-[15px] font-bold tracking-[-0.25px]">
                    Bill To
                </p>

                <CustomInput
                    id="client_name"
                    label="Client`s Name"
                    type="text"
                    placeholder="Alex Grim"
                    value={invoice.client_name}
                    onChange={handleChange}
                />

                <CustomInput
                    id="client_email"
                    label="Client`s Email"
                    type="text"
                    placeholder="alexgrim@mail.com"
                    value={invoice.client_email}
                    onChange={handleChange}
                />

                <CustomInput
                    id="street_to"
                    label="Street Address"
                    type="text"
                    placeholder="84 Church Way"
                    value={invoice.street_to}
                    onChange={handleChange}
                />

                <div className="flex items-center justify-between gap-6">
                    <CustomInput
                        id="city_to"
                        label="City"
                        type="text"
                        placeholder="Bradford"
                        value={invoice.city_to}
                        onChange={handleChange}
                    />

                    <CustomInput
                        id="postcode_to"
                        label="Post Code"
                        type="text"
                        placeholder="BD1 9PB"
                        value={invoice.postcode_to}
                        onChange={handleChange}
                    />

                    <div className="hidden w-full md:block">
                        <CustomInput
                            id="country_to"
                            label="Country"
                            type="text"
                            placeholder="United Kingdom"
                            value={invoice.country_to}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-full md:hidden">
                    <CustomInput
                        id="country_to"
                        label="Country"
                        type="text"
                        placeholder="United Kingdom"
                        value={invoice.country_to}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-10 space-y-6 md:mt-12">
                    <div className="md:flex md:items-center md:justify-center md:gap-6">
                        <div className="w-full">
                            <CustomDatePicker
                                invoiceDate={invoice.invoice_date}
                                updateInvoiceDate={handleDateChange}
                                disabled={isDateDisabled}
                            />
                        </div>

                        <div className="mt-6 w-full md:mt-0">
                            <Dropdown
                                id="payment_terms"
                                label="Payment Terms"
                                value={invoice.payment_terms}
                                onChange={handlePaymentTerms}
                                options={dropdownOptions}
                                open={isDropdownOpen}
                                onToggle={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                type="SELECT"
                                onForceClose={() => setIsDropdownOpen(false)}
                            />
                        </div>
                    </div>

                    <CustomInput
                        id="description"
                        label="Project / Description"
                        type="text"
                        placeholder="Graphic Design"
                        value={invoice.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="mt-[66px] md:mt-12">
                <p className="text-gray-graphite theme-transition mb-6 text-[18px] leading-[32px] font-bold tracking-[-0.38px]">
                    Items List
                </p>

                {isMd ? (
                    <div className="space-y-4">
                        <div
                            className={clsx(
                                "text-12px text-form-label theme-transition flex items-center justify-start gap-4 leading-[15px] font-medium tracking-[-0.25px]"
                            )}
                        >
                            <p
                                className={clsx(
                                    isModal ? "w-[214px]" : "min-w-[42%]"
                                )}
                            >
                                Item Name
                            </p>
                            <p className={isModal ? "w-[46px]" : "min-w-[9%]"}>
                                Qty.
                            </p>
                            <p
                                className={clsx(
                                    isModal ? "w-25" : "min-w-[19%]"
                                )}
                            >
                                Price
                            </p>
                            <p className="w-17">Total</p>
                        </div>

                        {invoice.items?.length
                            ? invoice.items.map((item: Item) => {
                                  return (
                                      <ItemCardMedium
                                          key={item.id}
                                          item={item}
                                          onChange={onItemChange}
                                          onRemoveItem={onRemoveItem}
                                          isModal={isModal}
                                      />
                                  );
                              })
                            : ""}

                        <CustomButton
                            buttonText="+ Add New Item"
                            onClick={onAddItem}
                            variant="button3"
                            extendedClass="w-full"
                        />
                    </div>
                ) : (
                    <div className="space-y-12">
                        {invoice.items?.length
                            ? invoice.items.map((item: Item) => {
                                  return (
                                      <ItemCardSmall
                                          key={item.id}
                                          item={item}
                                          onChange={onItemChange}
                                          onRemoveItem={onRemoveItem}
                                      />
                                  );
                              })
                            : ""}

                        <CustomButton
                            buttonText="+ Add New Item"
                            onClick={onAddItem}
                            variant="button3"
                            extendedClass="w-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
