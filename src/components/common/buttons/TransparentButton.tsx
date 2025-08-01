import { JSX } from "react";
import { twMerge } from "tailwind-merge";

interface TransparentButtonProps {
    ButtonIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
    extendedClass?: string;
}

export default function TransparentButton({
    ButtonIcon,
    onClick,
    extendedClass = "",
}: TransparentButtonProps): JSX.Element {
    return (
        <button
            className={twMerge(
                "text-icon hover:text-gray-soft theme-transition cursor-pointer",
                extendedClass
            )}
            onClick={onClick}
        >
            <ButtonIcon />
        </button>
    );
}
