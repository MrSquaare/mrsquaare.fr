import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Navbar, useTheme } from "react-daisyui";

import { WEBSITE_TITLE } from "../../../constants";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const TopBar: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={"bg-base-200"}>
      <div className={"container mx-auto"}>
        <Navbar className={"px-4"}>
          <Navbar.Start>
            <Link href={"/"}>
              <a className={"inline-flex items-center"}>
                <Image
                  alt={WEBSITE_TITLE}
                  height={28}
                  src={`/icon-${theme}.svg`}
                  width={28}
                />
              </a>
            </Link>
          </Navbar.Start>
          <Navbar.Center />
          <Navbar.End>
            <div className={"mr-1"}>
              <ThemeSwitcher />
            </div>
            <div className={"ml-1"}>
              <LanguageSwitcher />
            </div>
          </Navbar.End>
        </Navbar>
      </div>
    </div>
  );
};
