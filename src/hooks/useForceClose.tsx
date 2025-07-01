import React, { useEffect } from "react";

interface useForceCloseType {
    ref: React.RefObject<HTMLElement | null>;
    onForceClose: () => void;
    closeOnScroll?: boolean;
}

export const useForceClose = ({
    ref,
    onForceClose,
    closeOnScroll,
}: useForceCloseType): void => {
    useEffect(() => {
        const handleClickOrScroll = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onForceClose();
            }
        };

        const handleScroll = () => closeOnScroll && onForceClose();

        document.addEventListener("mousedown", handleClickOrScroll);
        document.addEventListener("touchstart", handleClickOrScroll);
        if (closeOnScroll) {
            window.addEventListener("scroll", handleScroll, true); // true = capture phase
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOrScroll);
            document.removeEventListener("touchstart", handleClickOrScroll);
            if (closeOnScroll) {
                window.removeEventListener("scroll", handleScroll, true);
            }
        };
    }, [ref, onForceClose, closeOnScroll]);
};
