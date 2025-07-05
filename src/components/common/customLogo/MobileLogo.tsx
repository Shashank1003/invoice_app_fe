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
            className="relative h-18 w-18 cursor-pointer md:h-20 md:w-20"
        >
            <div className="bg-indigo-primary absolute top-0 right-0 h-18 w-18 rounded-r-[20px] md:h-20 md:w-20"></div>
            <div className="bg-indigo-hover absolute bottom-0 left-0 h-9 w-18 rounded-tl-[20px] rounded-br-[20px] md:h-10 md:w-20"></div>
            <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}
