import { JSX } from "react";

interface InputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value: string | number;
    onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomInput({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
}: InputProps): JSX.Element {
    return (
        <div className="flex w-full flex-col gap-[10px]">
            <label
                htmlFor={id}
                className="text-form-label text-[12px] leading-[15px] font-medium tracking-[-0.25px]"
            >
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                className="bg-secondary-bg text-text border-border focus:border-indigo-primary hover:border-indigo-primary no-spinner h-12 w-full rounded border px-5 text-[12px] leading-[15px] font-bold tracking-[-0.25px] focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
