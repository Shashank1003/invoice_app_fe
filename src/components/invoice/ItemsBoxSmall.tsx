import { Item } from "@/types/itemTypes";
import { numberFormatter } from "@/utils/numberFormatter";
import { truncate } from "@/utils/truncate";
import { JSX } from "react";

export default function ItemsBoxSmall({
    items,
    total,
}: {
    items: Item[];
    total: number;
}): JSX.Element {
    return (
        <div className="mt-[40px]">
            <div className="bg-cloud-white theme-transition dark:bg-gray-deep flex flex-col items-center justify-center gap-[24px] rounded-t-[8px] p-[24px]">
                {items?.length &&
                    items.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="theme-transition flex w-full items-center justify-between text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                            >
                                <div>
                                    <p className="text-text theme-transition mb-[8px]">
                                        {truncate(item.name, 25)}
                                    </p>
                                    <p className="text-gray-muted theme-transition dark:text-gray-steel">{`${numberFormatter(item.quantity)} x ${numberFormatter(item.price, { type: "currency" })}`}</p>
                                </div>

                                <div>
                                    <p className="text-text theme-transition">
                                        {numberFormatter(item.total, {
                                            type: "currency",
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="bg-slate-blue theme-transition dark:bg-gray-very-dark flex h-[80px] items-center justify-between rounded-b-[8px] p-[24px] text-white">
                <p className="theme-transition text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                    Amount Due
                </p>
                <p className="theme-transition text-[20px] leading-[32px] font-bold tracking-[-0.42px]">
                    {numberFormatter(total, { type: "currency" })}
                </p>
            </div>
        </div>
    );
}
