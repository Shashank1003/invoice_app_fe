import Invoices from "@/app/invoices/page";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default function Home(): JSX.Element {
    // return <Invoices />;
    redirect("/invoices");
}
