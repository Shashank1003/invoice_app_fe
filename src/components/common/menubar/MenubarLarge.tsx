import Moon from "@/assets/icon-moon.svg";
import Sun from "@/assets/icon-sun.svg";
import UserImage from "@/assets/image-avatar.jpg";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import { useThemeContext } from "@/context/themeContext";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useCallback } from "react";
import Logo from "../Logo";

export default function MenubarSmall({
    extendedCls = "",
}: {
    extendedCls?: string;
}): JSX.Element {
    const { isDarkMode, toggleDarkMode } = useThemeContext();
    const router = useRouter();

    const navigateToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    return (
        <div
            className={clsx(
                "bg-sidebar-bg theme-transition fixed top-0 left-0 flex h-screen w-26 flex-col items-center justify-between rounded-r-[20px]",
                extendedCls
            )}
        >
            <Logo onClick={navigateToHome} />

            <div className="flex flex-col items-center justify-center gap-6 pb-6">
                <TransparentButton
                    ButtonIcon={isDarkMode ? Sun : Moon}
                    onClick={toggleDarkMode}
                />
                <div className="bg-gray-dark theme-transition mt-1 h-[1px] w-26" />
                <div>
                    <Image
                        src={UserImage}
                        alt="user"
                        width={40}
                        height={40}
                        className="rounded-full"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
