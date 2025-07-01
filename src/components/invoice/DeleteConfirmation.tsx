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
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 px-[24px]">
            <div className="bg-secondary-bg shadow-custom rounded-[8px] p-[32px]">
                <p className="text-text text-[20px] leading-[32px] font-bold tracking-[-0.42px]">
                    Confirm Deletion
                </p>

                <p className="text-gray-steel text- mt-[8px] text-[12px] leading-[22px] font-medium tracking-[-0.25px]">
                    Are you sure you want to delete invoice #XM9141? This action
                    cannot be undone.
                </p>

                <div className="mt-[24px] flex items-center justify-end gap-[8px]">
                    <CustomButton
                        variant="button3"
                        buttonText="Cancel"
                        onClick={onCancel}
                        style={{ width: "90px" }}
                    />

                    <CustomButton
                        variant="redButton"
                        buttonText="Delete"
                        onClick={onDelete}
                        style={{ width: "90px" }}
                    />
                </div>
            </div>
        </div>
    );
}
