import Logo from "@/assets/logo.svg";
import { JSX } from "react";

export default function MobileLogo({
    onClick,
}: {
    onClick: () => void;
}): JSX.Element {
    return (
        <div
            onClick={onClick}
            className="relative h-[72px] w-[72px] cursor-pointer"
        >
            <div className="bg-indigo-primary absolute top-0 right-0 h-[72px] w-[72px] rounded-r-[20px]"></div>
            <div className="bg-indigo-hover absolute bottom-0 left-0 h-[36px] w-[72px] rounded-tl-[20px] rounded-br-[20px]"></div>
            <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}
