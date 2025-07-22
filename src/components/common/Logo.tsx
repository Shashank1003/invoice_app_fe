import CircleLogoLarge from "@/assets/logo-large.svg";
import CircleLogoMedium from "@/assets/logo-medium.svg";
import CircleLogo from "@/assets/logo.svg";
import clsx from "clsx";
import { JSX } from "react";

export default function Logo({
    onClick,
}: {
    onClick: () => void;
}): JSX.Element {
    const logoClass =
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:rotate-[360deg] transition-transform duration-500 ";
    return (
        <div
            onClick={onClick}
            className="group relative h-18 w-18 cursor-pointer md:h-20 md:w-20 lg:h-26 lg:w-26"
        >
            <div className="bg-indigo-primary absolute top-0 right-0 h-18 w-18 rounded-r-[20px] md:h-20 md:w-20 lg:h-26 lg:w-26" />

            <div className="bg-indigo-hover absolute bottom-0 left-0 h-9 w-18 rounded-tl-[20px] rounded-br-[20px] md:h-10 md:w-20 lg:h-13 lg:w-26" />

            <CircleLogo className={clsx(logoClass, "md:hidden")} />

            <CircleLogoMedium
                className={clsx(logoClass, "hidden md:block lg:hidden")}
            />

            <CircleLogoLarge className={clsx(logoClass, "hidden lg:block")} />
        </div>
    );
}
