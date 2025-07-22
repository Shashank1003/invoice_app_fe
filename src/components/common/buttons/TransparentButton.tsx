import clsx from "clsx";
import { JSX } from "react";

interface TransparentButtonProps {
    ButtonIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    customStyle?: React.CSSProperties;
    onClick: () => void;
    className?: string;
}

export default function TransparentButton({
    ButtonIcon,
    customStyle = {},
    onClick,
    className = "",
}: TransparentButtonProps): JSX.Element {
    return (
        <button
            className={clsx(
                "text-icon hover:text-gray-soft theme-transition cursor-pointer",
                className
            )}
            style={customStyle}
            onClick={onClick}
        >
            <ButtonIcon />
        </button>
    );
}
