import Moon from "@/assets/icon-moon.svg";
import Sun from "@/assets/icon-sun.svg";
import UserImage from "@/assets/image-avatar.jpg";
import TransparentButton from "@/components/common/buttons/TransparentButton";
import MobileLogo from "@/components/common/customLogo/MobileLogo";
import { useThemeContext } from "@/context/themeContext";
import Image from "next/image";
import { JSX } from "react";

export default function Menubar(): JSX.Element {
    const { isDarkMode, toggleDarkMode } = useThemeContext();
    return (
        <div className="bg-sidebar-bg flex h-[72px] w-full items-center justify-between">
            <MobileLogo />

            <div className="mr-[24px] flex items-center justify-between gap-[24px]">
                <TransparentButton
                    ButtonIcon={isDarkMode ? Sun : Moon}
                    onClick={toggleDarkMode}
                />
                <div className="bg-gray-dark h-[72px] w-[1px]" />
                <div>
                    <Image
                        src={UserImage}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}
