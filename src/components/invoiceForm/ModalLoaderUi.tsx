import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

export default function ModalLoaderUi(): JSX.Element {
    return (
        <div className="my-14 px-14">
            <Skeleton className="bg-skeleton h-8 w-50 rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-28 h-12 w-full rounded-[8px]" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
            </div>

            <Skeleton className="bg-skeleton mt-28 h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
            </div>

            <div className="mt-18 flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
            </div>

            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
        </div>
    );
}
