import { JSX } from "react";

export default function LayoutCreate({
    modalCreate,
    children,
}: {
    modalCreate: React.ReactNode;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <div>{children}</div>
            <div>{modalCreate}</div>
        </>
    );
}
