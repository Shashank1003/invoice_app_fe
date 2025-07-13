import Moon from "@/assets/icon-moon.svg";
import Sun from "@/assets/icon-sun.svg";
import UserImage from "@/assets/image-avatar.jpg";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import Logo from "@/components/common/customLogo/Logo";
import { useThemeContext } from "@/context/themeContext";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useCallback } from "react";

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
                "bg-sidebar-bg flex h-18 w-full items-center justify-between md:h-20",
                extendedCls
            )}
        >
            <Logo onClick={navigateToHome} />

            <div className="mr-6 flex items-center justify-between gap-6 md:gap-[30px]">
                <TransparentButton
                    ButtonIcon={isDarkMode ? Sun : Moon}
                    onClick={toggleDarkMode}
                />
                <div className="bg-gray-dark h-18 w-[1px] md:h-20" />
                <div>
                    <Image
                        src={UserImage}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
