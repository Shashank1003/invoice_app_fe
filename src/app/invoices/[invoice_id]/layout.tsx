import { JSX } from "react";

export default function LayoutEdit({
    modalEdit,
    children,
}: {
    modalEdit: React.ReactNode;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <div>{children}</div>
            <div>{modalEdit}</div>
        </>
    );
}
