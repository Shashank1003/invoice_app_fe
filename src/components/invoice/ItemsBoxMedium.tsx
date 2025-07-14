import { Item } from "@/types/itemTypes";
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
            <div className="bg-cloud-white dark:bg-gray-deep w-full rounded-t-[8px] px-8 pt-1 pb-3">
                <table className="w-full table-fixed border-separate border-spacing-y-7">
                    <thead>
                        <tr className="text-gray-muted dark:text-gray-soft text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
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
                                    className="text-text text-left text-[12px] leading-[15px] font-bold tracking-[-0.25px]"
                                >
                                    <td className="text-left">{item.name}</td>
                                    <td className="text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="text-right">{`£ ${item.price}`}</td>
                                    <td className="text-right">{`£ ${item.total}`}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="bg-slate-blue dark:bg-gray-very-dark flex h-20 items-center justify-between rounded-b-[8px] p-8 text-white">
                <p className="text-[11px] leading-[18px] font-medium tracking-[-0.23px]">
                    Amount Due
                </p>
                <p className="text-[24px] leading-[32px] font-bold tracking-[-0.5px]">{`£ ${total}`}</p>
            </div>
        </div>
    );
}
