import { Item } from "@/types/itemTypes";
import { JSX } from "react";

export default function ItemsBox({
    items,
    total,
}: {
    items: Item[];
    total: number;
}): JSX.Element {
    return (
        <div className="mt-[40px]">
            <div className="bg-cloud-white dark:bg-gray-deep flex flex-col items-center justify-center gap-[24px] rounded-t-[8px] p-[24px]">
                {items?.length &&
                    items.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="flex w-full items-center justify-between text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                            >
                                <div>
                                    <p className="text-text mb-[8px]">
                                        {item.name}
                                    </p>
                                    <p className="text-gray-muted dark:text-gray-steel">{`${item.quantity} x £ ${item.price}`}</p>
                                </div>

                                <div>
                                    <p className="text-text">{`£ ${item.total}`}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="bg-slate-blue dark:bg-gray-very-dark flex h-[80px] items-center justify-between rounded-b-[8px] p-[24px] text-white">
                <p className="text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                    Amount Due
                </p>
                <p className="text-[20px] leading-[32px] font-bold tracking-[-0.42px]">{`£ ${total}`}</p>
            </div>
        </div>
    );
}
