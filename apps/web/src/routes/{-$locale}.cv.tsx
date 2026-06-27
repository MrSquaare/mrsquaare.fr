import type { FC } from "react";

import {
  Navigation,
  NavigationItem,
  NavigationLink,
  NavigationList,
} from "@sandwich-ui/react";
import { css } from "@sandwich-ui/styled-system/css";
import { createFileRoute, Link } from "@tanstack/react-router";

import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { m } from "@/paraglide/messages";

import {
  AboutMe,
  Contacts,
  Educations,
  Experiences,
  Languages,
  ProfileHeader,
  Skills,
} from "../components/cv";
import { getLocale } from "../paraglide/runtime";

// eslint-disable-next-line react-refresh/only-export-components
const CV: FC = () => {
  const language = getLocale();

  return (
    <>
      <Navigation
        className={css({
          left: { base: 4, md: 8 },
          maxW: "768px",
          mx: "auto",
          right: { base: 4, md: 8 },
          top: { base: 4, md: 8 },
        })}
        sticky
      >
        <NavigationList>
          <NavigationItem>
            <NavigationLink asChild>
              <Link params={(prev) => prev} to={"/{-$locale}"}>
                {m["cv.nav.home"]()}
              </Link>
            </NavigationLink>
          </NavigationItem>
        </NavigationList>
        <NavigationList position={"right"}>
          <NavigationItem>
            <div
              className={css({
                alignItems: "center",
                display: "flex",
                gap: 3,
                px: 3,
              })}
            >
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </NavigationItem>
        </NavigationList>
      </Navigation>
      <main
        className={css({
          maxWidth: "1280px",
          minHeight: "screen",
          mt: { base: 6, md: 8 },
          mx: "auto",
          p: { base: 4, md: 8 },
        })}
      >
        <ProfileHeader />
        <div
          className={css({
            display: "flex",
            flexDirection: "column-reverse",
            gap: { base: 4, md: 8 },
            md: {
              flexDirection: "row",
            },
          })}
        >
          <div
            className={css({
              flexBasis: "full",
              md: {
                flexBasis: "3/12",
              },
              spaceY: { base: 4, md: 8 },
            })}
          >
            <AboutMe />
            <Languages />
            <Contacts />
          </div>
          <div
            className={css({
              flexBasis: "full",
              md: {
                flexBasis: "9/12",
              },
              spaceY: { base: 4, md: 8 },
            })}
          >
            <Experiences language={language} />
            <Educations language={language} />
            <Skills />
          </div>
        </div>
      </main>
    </>
  );
};

export const Route = createFileRoute("/{-$locale}/cv")({
  component: CV,
  head: () => ({
    meta: [
      { title: m["cv.page.meta.title"]() },
      { content: m["cv.page.meta.description"](), name: "description" },
    ],
  }),
});
