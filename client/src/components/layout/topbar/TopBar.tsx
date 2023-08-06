import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { Button, Dropdown, Navbar, useTheme } from "react-daisyui";
import { useTranslation } from "react-i18next";

import { WEBSITE_TITLE } from "../../../constants";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const TopBar: FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("topBar");
  const { theme } = useTheme();

  return (
    <div className={"bg-base-200"}>
      <div className={"container mx-auto"}>
        <Navbar className={"px-4"}>
          <Navbar.Start>
            <Link className={"inline-flex items-center"} href={"/"}>
              <Image
                alt={WEBSITE_TITLE}
                height={28}
                src={`/icon-${theme}.svg`}
                width={28}
              />
            </Link>
          </Navbar.Start>
          <Navbar.Center className={"justify-center"}>
            <Link href={"/"} legacyBehavior passHref>
              <Button color={"ghost"} size={"sm"} tag={"a"}>
                {t("navigation.home.title", { lng: locale })}
              </Button>
            </Link>
            <Dropdown>
              <Dropdown.Toggle color={"ghost"} size={"sm"}>
                {t("navigation.blog.title", { lng: locale })}
              </Dropdown.Toggle>
              <Dropdown.Menu className={"w-52"}>
                <Link href={"/blog"} legacyBehavior passHref>
                  <Dropdown.Item>
                    {t("navigation.blog.home", { lng: locale })}
                  </Dropdown.Item>
                </Link>
                <Link href={"/blog/categories"} legacyBehavior passHref>
                  <Dropdown.Item>
                    {t("navigation.blog.categories", { lng: locale })}
                  </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Center>
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
