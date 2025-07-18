import clsx from "clsx";
import { JSX } from "react";

interface InputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string | number;
    onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    noLabel?: boolean;
    extendedCls?: string;
}

export default function CustomInput({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    noLabel = false,
    extendedCls = "",
}: InputProps): JSX.Element {
    return (
        <div className="flex w-full flex-col gap-[10px]">
            {!noLabel && (
                <label
                    htmlFor={id}
                    className="text-form-label text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                name={id}
                id={id}
                className={clsx(
                    "bg-secondary-bg text-text border-border focus:border-indigo-primary hover:border-indigo-primary no-spinner h-12 w-full rounded border px-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none",
                    extendedCls
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
