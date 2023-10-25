"use client";

import Image from "next/image";
import Link from "next/link";
import { PageProps } from "next/navigation";
import { useTheme } from "next-themes";
import { FC } from "react";

import { Button } from "../../components/ui/button";
import { Icon } from "../../components/ui/icon";
import { LanguageSwitcher } from "../../components/ui/language-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { ThemeSwitcher } from "../../components/ui/theme-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { GITHUB_LINK, MAIL_LINK, TWITTER_LINK } from "../../constants/link";
import { useTranslation } from "../../i18n/client";

const HomePage: FC<PageProps> = ({ params: { lng } }) => {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation(lng, "home");

  return (
    <>
      <div className={"fixed top-0 z-10 w-full"}>
        <NavigationMenu
          className={"container mx-auto w-full justify-end px-4 py-2"}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <LanguageSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeSwitcher />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <main
        className={
          "container mx-auto flex min-h-screen flex-col items-center justify-center"
        }
      >
        <Image
          alt={"Logo"}
          className={"mb-4"}
          height={200}
          src={resolvedTheme === "dark" ? "/icon-dark.svg" : "/icon-light.svg"}
          width={200}
        />
        <h1 className={"mb-2 text-center text-6xl"}>
          {t("title")} <span className={"font-bold"}>MrSquaare</span>
        </h1>
        <h2 className={"mb-4 text-center text-2xl"}>{t("subtitle")}</h2>
        <div className={"mb-2 flex space-x-4"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className={"text-2xl"}
                size={"lg"}
                variant={"outline"}
              >
                <Link
                  href={MAIL_LINK}
                  referrerPolicy={"no-referrer"}
                  target={"_blank"}
                >
                  <Icon icon={"ph:envelope"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Contact me</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className={"text-2xl"}
                size={"lg"}
                variant={"outline"}
              >
                <Link
                  href={GITHUB_LINK}
                  referrerPolicy={"no-referrer"}
                  target={"_blank"}
                >
                  <Icon icon={"ph:github-logo"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                className={"text-2xl"}
                size={"lg"}
                variant={"outline"}
              >
                <Link
                  href={TWITTER_LINK}
                  referrerPolicy={"no-referrer"}
                  target={"_blank"}
                >
                  <Icon icon={"ph:twitter-logo"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Twitter (𝕏)</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Button asChild className={"text-lg"} size={"lg"} variant={"outline"}>
            <Link href={`/${lng}/cv`}>{t("cv")}</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
