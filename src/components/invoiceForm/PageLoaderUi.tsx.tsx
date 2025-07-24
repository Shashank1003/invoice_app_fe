import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

export default function PageLoaderUi(): JSX.Element {
    return (
        <div className="my-6 px-6 md:my-8 md:px-14 lg:my-9 lg:px-0">
            <Skeleton className="bg-skeleton h-8 w-45 rounded-[8px] md:w-50" />
            <Skeleton className="bg-skeleton mt-22 h-12 w-full rounded-[8px] md:mt-28" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton hidden h-12 w-full rounded-[8px] md:block" />
            </div>

            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px] md:hidden" />
            <Skeleton className="bg-skeleton mt-26 h-12 w-full rounded-[8px] md:mt-28" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton hidden h-12 w-full rounded-[8px] md:block" />
            </div>

            <div className="mt-18 hidden items-center justify-between gap-6 md:flex">
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
                <Skeleton className="bg-skeleton h-12 w-full rounded-[8px]" />
            </div>

            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[65px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-12 w-full rounded-[8px]" />
        </div>
    );
}
