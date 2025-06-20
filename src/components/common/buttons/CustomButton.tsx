import clsx from "clsx";
import { JSX } from "react";

export default function CustomButton({
    buttonText,
    style,
    onClick,
    variant,
}: {
    buttonText: string;
    style?: React.CSSProperties; // just in case some changes are required
    onClick: () => void;
    variant?: "redButton" | "indigoButton" | "button3";
}): JSX.Element {
    return (
        <button
            style={style}
            className={clsx(
                "h-[48px] rounded-[24px] text-[12px] leading-[15px] font-bold tracking-[-0.25px]",

                {
                    "bg-button3-bg text-button3-text hover:bg-button3-hover w-[73px]":
                        variant === "button3",
                    "bg-red-primary hover:bg-red-hover w-[89px] text-white":
                        variant === "redButton",
                    "bg-indigo-primary hover:bg-indigo-hover w-[149px] text-white":
                        variant === "indigoButton",
                }
            )}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
