import { useLockScroll } from "@/hooks/useLockScroll";
import { JSX } from "react";
import CustomButton from "../common/buttons/CustomButton";

export default function DeleteConfirmation({
    onCancel,
    onDelete,
}: {
    onCancel: () => void;
    onDelete: () => void;
}): JSX.Element {
    useLockScroll(true);

    return (
        <div className="theme-transition fixed inset-0 flex items-center justify-center bg-black/75 px-6">
            <div className="bg-secondary-bg theme-transition shadow-custom rounded-[8px] p-8 md:p-12">
                <p className="text-text theme-transition text-[20px] leading-[32px] font-bold tracking-[-0.42px] md:text-[24px] md:leading-[-0.5px]">
                    Confirm Deletion
                </p>

                <p className="text-gray-steel theme-transition mt-2 text-[12px] leading-[22px] font-medium tracking-[-0.25px] md:mt-3">
                    Are you sure you want to delete invoice #XM9141? This action
                    cannot be undone.
                </p>

                <div className="mt-6 flex items-center justify-end gap-2 md:mt-4">
                    <CustomButton
                        variant="button3"
                        buttonText="Cancel"
                        onClick={onCancel}
                        extendedClass="!w-[90px]"
                    />

                    <CustomButton
                        variant="redButton"
                        buttonText="Delete"
                        onClick={onDelete}
                        extendedClass="!w-[90px]"
                    />
                </div>
            </div>
        </div>
    );
}
