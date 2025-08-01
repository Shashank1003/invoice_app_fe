import DeleteIcon from "@/assets/icon-delete.svg";
import { Item } from "@/types/itemTypes";
import { numberFormatter } from "@/utils/numberFormatter";
import clsx from "clsx";
import { JSX } from "react";
import CustomInput from "../common/CustomInput";
import TransparentButton from "../common/buttons/TransparentButton";

interface ItemCardProps {
    item: Item;
    onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveItem: (_itemId: string) => void;
    isModal?: boolean;
}

export default function ItemCardMedium({
    item,
    onChange,
    onRemoveItem,
    isModal = true,
}: ItemCardProps): JSX.Element {
    return (
        <div
            className={clsx(
                "theme-transition flex w-full items-start justify-start gap-4"
            )}
        >
            <div className={clsx(isModal ? "w-[214px]" : "min-w-[42%]")}>
                <CustomInput
                    id={`name-${item.id}`}
                    label="Item Name"
                    type="text"
                    placeholder="Banner Design"
                    value={item.name}
                    onChange={onChange}
                    noLabel
                />
            </div>

            <div className={isModal ? "w-[46px]" : "min-w-[9%]"}>
                <CustomInput
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    onChange={onChange}
                    label="Qty."
                    placeholder=""
                    noLabel
                    extendedCls="!px-3"
                />
            </div>

            <div className={clsx(isModal ? "w-25" : "min-w-[19%]")}>
                <CustomInput
                    type="number"
                    id={`price-${item.id}`}
                    value={item.price}
                    onChange={onChange}
                    label="price"
                    placeholder=""
                    noLabel
                />
            </div>

            <div className={clsx(isModal ? "w-17" : "w-full")}>
                <div
                    role="textbox"
                    aria-disabled="true"
                    aria-label="Total"
                    className="bg-bg theme-transition text-gray-steel flex h-12 w-full items-center justify-start overflow-hidden text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                >
                    {numberFormatter(item.total, { type: "currency" })}
                </div>
            </div>

            <div className="flex items-center justify-center self-end pb-4">
                <TransparentButton
                    ButtonIcon={DeleteIcon}
                    onClick={() => onRemoveItem(item.id!)}
                    extendedClass="text-gray-steel hover:text-color-error h-4 w-3"
                />
            </div>
        </div>
    );
}
