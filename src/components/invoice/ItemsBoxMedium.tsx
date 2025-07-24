import { Item } from "@/types/itemTypes";
import { numberFormatter } from "@/utils/numberFormatter";
import { truncate } from "@/utils/truncate";
import millify from "millify";
import { JSX } from "react";

export default function ItemsBoxMedium({
    items,
    total,
}: {
    items: Item[];
    total: number;
}): JSX.Element {
    return (
        <div className="mt-10 lg:mt-[45px]">
            <div className="bg-cloud-white theme-transition dark:bg-gray-deep w-full rounded-t-[8px] px-8 pt-1 pb-3">
                <table className="theme-transition w-full table-fixed border-separate border-spacing-y-7">
                    <thead>
                        <tr className="text-gray-muted theme-transition dark:text-gray-soft text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                            <th className="text-left font-medium">Item Name</th>
                            <th className="text-right font-medium">OTY.</th>
                            <th className="text-right font-medium">Price</th>
                            <th className="text-right font-medium">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(item => {
                            return (
                                <tr
                                    key={item.id}
                                    className="text-text theme-transition text-left text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                                >
                                    <td className="text-left">
                                        {truncate(item.name, 30)}
                                    </td>
                                    <td className="text-right">
                                        {numberFormatter(item.quantity)}
                                    </td>
                                    <td className="text-right">
                                        {numberFormatter(item.price, {
                                            type: "currency",
                                        })}
                                    </td>
                                    <td className="text-right">
                                        {numberFormatter(item.total, {
                                            type: "currency",
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-blue theme-transition dark:bg-gray-very-dark flex h-20 items-center justify-between rounded-b-[8px] p-8 text-white">
                <p className="theme-transition text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                    Amount Due
                </p>
                <p className="theme-transition text-[24px] leading-[32px] font-bold tracking-[-0.5px]">
                    {numberFormatter(total, { type: "currency" })}
                </p>
            </div>
        </div>
    );
}
