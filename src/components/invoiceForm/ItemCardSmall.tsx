import DeleteIcon from "@/assets/icon-delete.svg";
import { Item } from "@/types/itemTypes";
import { JSX } from "react";
import CustomInput from "../common/CustomInput";
import TransparentButton from "../common/buttons/TransparentButton";

interface ItemCardProps {
    item: Item;
    onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveItem: (_itemId: string) => void;
}

export default function ItemCardSmall({
    item,
    onChange,
    onRemoveItem,
}: ItemCardProps): JSX.Element {
    return (
        <div className="theme-transition w-full">
            <CustomInput
                id={`name-${item.id}`}
                label="Item Name"
                type="text"
                placeholder="Banner Design"
                value={item.name}
                onChange={onChange}
            />

            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center justify-start gap-4">
                    <div className="flex w-[25%] flex-col items-start justify-start gap-[10px]">
                        <label
                            htmlFor={`quantity-${item.id}`}
                            className="text-form-label theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
                        >
                            Qty.
                        </label>
                        <input
                            type="number"
                            name={`quantity-${item.id}`}
                            id={`quantity-${item.id}`}
                            className="bg-secondary-bg text-text border-border focus:border-indigo-primary theme-transition theme-transition hover:border-indigo-primary no-spinner h-12 w-full rounded border pl-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none"
                            value={item.quantity}
                            onChange={onChange}
                        />
                    </div>

                    <div className="flex w-[37.5%] flex-col items-start justify-start gap-[10px]">
                        <label
                            htmlFor={`price-${item.id}`}
                            className="text-form-label theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name={`price-${item.id}`}
                            id={`price-${item.id}`}
                            className="bg-secondary-bg text-text theme-transition border-border focus:border-indigo-primary hover:border-indigo-primary no-spinner h-12 w-full rounded border pl-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none"
                            value={item.price}
                            onChange={onChange}
                        />
                    </div>

                    <div className="flex w-[37.5%] flex-col items-start justify-start gap-[10px]">
                        <label
                            id={`total-${item.id}`}
                            className="text-form-label theme-transition text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
                        >
                            Total
                        </label>
                        <div
                            role="textbox"
                            aria-disabled="true"
                            aria-labelledby={`total-${item.id}`}
                            className="bg-bg text-gray-steel theme-transition flex h-12 w-full items-center justify-start text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                        >
                            {item.total}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center self-end pb-4">
                    <TransparentButton
                        ButtonIcon={DeleteIcon}
                        onClick={() => onRemoveItem(item.id!)}
                        className="!text-gray-steel hover:!text-color-error !h-4 !w-[13px]"
                    />
                </div>
            </div>
        </div>
    );
}
