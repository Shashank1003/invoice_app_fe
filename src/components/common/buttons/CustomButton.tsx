import clsx from "clsx";
import { JSX } from "react";

interface CustomButtonProps {
    buttonText: string | React.ReactElement;
    style?: React.CSSProperties; // just in case some style changes are required
    onClick: () => void;
    variant?: "redButton" | "indigoButton" | "button3" | "button4";
    extendedClass?: string;
    disabled?: boolean;
}

export default function CustomButton({
    buttonText,
    style,
    onClick,
    variant,
    extendedClass,
    disabled = false,
}: CustomButtonProps): JSX.Element {
    return (
        <button
            style={style}
            className={clsx(
                "theme-transition h-[48px] rounded-[24px] text-[12px] leading-[15px] font-bold tracking-[-0.25px]",
                disabled
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer opacity-100",

                {
                    "bg-button3-bg text-button3-text hover:bg-button3-hover w-[73px]":
                        variant === "button3",
                    "bg-button4-bg text-button4-text hover:bg-button4-hover w-[73px]":
                        variant === "button4",
                    "bg-red-primary hover:bg-red-hover w-[89px] text-white":
                        variant === "redButton",
                    "bg-indigo-primary hover:bg-indigo-hover w-[149px] text-white":
                        variant === "indigoButton",
                },
                extendedClass
            )}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
