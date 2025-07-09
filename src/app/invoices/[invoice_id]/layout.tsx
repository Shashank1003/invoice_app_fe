import { JSX } from "react";

export default function Layout({
    modal,
    children,
}: {
    modal: React.ReactNode;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <div>{children}</div>

            <div>{modal}</div>
        </>
    );
}
