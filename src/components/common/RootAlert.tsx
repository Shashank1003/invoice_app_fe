"use client";

import { useEffect } from "react";
import { toast } from "sonner"; // or react-toastify

export function RootAlert(): null {
    useEffect(() => {
        const shown = sessionStorage.getItem("slow-backend-alert");
        if (!shown) {
            toast.warning("Backend is warming up", {
                description:
                    "Responses may be slow for a few seconds. Thanks for your patience!",
                duration: 3000,
                position: "top-center",
            });
            sessionStorage.setItem("slow-backend-alert", "true");
        }
    }, []);

    return null;
}
