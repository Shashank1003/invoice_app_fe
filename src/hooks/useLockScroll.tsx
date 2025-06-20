"use client";
import { useLayoutEffect } from "react";

export const useLockScroll = (shouldLock: boolean): void => {
    useLayoutEffect(() => {
        if (shouldLock) {
            // Save current overflow value
            const originalStyle = window.getComputedStyle(
                document.body
            ).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [shouldLock]);
};
