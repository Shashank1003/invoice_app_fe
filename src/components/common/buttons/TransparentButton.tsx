import { JSX } from "react";

interface TransparentButtonProps {
    ButtonIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    customStyle?: React.CSSProperties;
    onClick: () => void;
}

export default function TransparentButton({
    ButtonIcon,
    customStyle = {},
    onClick,
}: TransparentButtonProps): JSX.Element {
    return (
        <button
            className="text-icon hover:text-gray-soft cursor-pointer"
            style={customStyle}
            onClick={onClick}
        >
            <ButtonIcon />
        </button>
    );
}
