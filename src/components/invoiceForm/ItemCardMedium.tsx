import DeleteIcon from "@/assets/icon-delete.svg";
import { Item } from "@/types/itemTypes";
import { numberFormatter } from "@/utils/numberFormatter";
import { JSX } from "react";
import CustomInput from "../common/CustomInput";
import TransparentButton from "../common/buttons/TransparentButton";
interface ItemCardProps {
    item: Item;
    onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveItem: (_itemId: string) => void;
}

export default function ItemCardMedium({
    item,
    onChange,
    onRemoveItem,
}: ItemCardProps): JSX.Element {
    return (
        <div className="theme-transition flex w-full items-start justify-between gap-4">
            <div className="w-[214px]">
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

            <div className="w-[46px]">
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

            <div className="w-25">
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

            <div className="w-17">
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
                    className="!text-gray-steel hover:!text-color-error !h-4 !w-[13px]"
                />
            </div>
        </div>
    );
}
