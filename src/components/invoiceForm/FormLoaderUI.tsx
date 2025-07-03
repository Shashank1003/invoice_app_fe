import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

export default function FormLoaderUI(): JSX.Element {
    return (
        <div className="m-6">
            <Skeleton className="bg-skeleton h-[32px] w-[171px] rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-22 h-[48px] w-full rounded-[8px]" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-[48px] w-full rounded-[8px]" />

                <Skeleton className="bg-skeleton h-[48px] w-full rounded-[8px]" />
            </div>

            <Skeleton className="bg-skeleton h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[105px] h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-[48px] w-full rounded-[8px]" />

            <div className="my-[50px] flex items-center justify-between gap-6">
                <Skeleton className="bg-skeleton h-[48px] w-full rounded-[8px]" />

                <Skeleton className="bg-skeleton h-[48px] w-full rounded-[8px]" />
            </div>
            <Skeleton className="bg-skeleton mt-[50px] h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[65px] h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-[48px] w-full rounded-[8px]" />
            <Skeleton className="bg-skeleton mt-[50px] h-[48px] w-full rounded-[8px]" />
        </div>
    );
}
