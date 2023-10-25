"use client";

import Link from "next/link";
import { PageProps } from "next/navigation";
import { FC, useCallback } from "react";

import { CV } from "../../../components/cv/cv";
import { Button } from "../../../components/ui/button";
import { LanguageSwitcher } from "../../../components/ui/language-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../../components/ui/navigation-menu";
import { ThemeSwitcher } from "../../../components/ui/theme-switcher";
import { useTranslation } from "../../../i18n/client";

const CVPage: FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "cv");

  const downloadAsPDF = useCallback(() => {
    print();
  }, []);

  return (
    <>
      <div
        className={
          "sticky top-0 z-10 bg-neutral-100 dark:bg-neutral-800 print:hidden"
        }
      >
        <NavigationMenu
          className={"mx-auto  max-w-[1024px] justify-between px-4 py-2"}
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button asChild variant={"outline"}>
                <Link href={`/${lng}`}>{t("nav.home")}</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button onClick={downloadAsPDF}>
                {t("nav.download_as_pdf")}
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <LanguageSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeSwitcher />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <main className={"mx-auto min-h-screen max-w-[1024px] p-4"}>
        <CV />
      </main>
    </>
  );
};

export default CVPage;
