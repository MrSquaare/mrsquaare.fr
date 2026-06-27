import type { FC } from "react";

import { Icon } from "@iconify-icon/react";
import {
  Button,
  Mark,
  Tooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from "@sandwich-ui/react";
import { css, cx } from "@sandwich-ui/styled-system/css";
import { container } from "@sandwich-ui/styled-system/patterns";
import { createFileRoute, Link } from "@tanstack/react-router";

import { LogoIcon } from "../components/common/icon";
import { LanguageSwitcher } from "../components/common/language-switcher";
import { ThemeSwitcher } from "../components/common/theme-switcher";
import { BLUESKY_LINK, GITHUB_LINK, MAIL_LINK } from "../constants/link";
import { m } from "../paraglide/messages";

// eslint-disable-next-line react-refresh/only-export-components
const Home: FC = () => {
  return (
    <>
      <div
        className={css({
          display: "flex",
          gap: { base: 3, md: 4 },
          position: "fixed",
          right: { base: 6, md: 8 },
          top: { base: 6, md: 8 },
          zIndex: "navigation",
        })}
      >
        <LanguageSwitcher size={"lg"} />
        <ThemeSwitcher size={"lg"} />
      </div>
      <main
        className={cx(
          container(),
          css({
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minH: "screen",
          }),
        )}
      >
        <LogoIcon
          className={css({
            height: { base: "192px", md: "256px" },
            mb: { base: 9, md: 12 },
            width: { base: "192px", md: "256px" },
          })}
        />
        <h1
          className={css({
            fontSize: { base: "6xl", md: "7xl" },
            lineHeight: "1.1",
            mb: { base: 3, md: 4 },
            textAlign: "center",
          })}
        >
          {m["home.title"]()} <Mark>MrSquaare</Mark>
        </h1>
        <h2
          className={css({
            fontSize: { base: "xl", md: "2xl" },
            lineHeight: "1",
            mb: { base: 9, md: 12 },
            textAlign: "center",
          })}
        >
          {m["home.subtitle"]()}
        </h2>
        <div
          className={css({
            display: "flex",
            mb: { base: 3, md: 4 },
            spaceX: { base: 3, md: 4 },
          })}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={"Mail"}
                asChild
                color={"secondary"}
                size={"lg"}
                variant={"outlined"}
              >
                <a
                  href={MAIL_LINK}
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Icon height={24} icon={"ph:envelope"} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipPositioner>
              <TooltipContent>{m["home.contact_me"]()}</TooltipContent>
            </TooltipPositioner>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={"GitHub"}
                asChild
                color={"secondary"}
                size={"lg"}
                variant={"outlined"}
              >
                <a
                  href={GITHUB_LINK}
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Icon height={24} icon={"simple-icons:github"} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipPositioner>
              <TooltipContent>GitHub</TooltipContent>
            </TooltipPositioner>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label={"Bluesky"}
                asChild
                color={"secondary"}
                size={"lg"}
                variant={"outlined"}
              >
                <a
                  href={BLUESKY_LINK}
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                >
                  <Icon height={24} icon={"simple-icons:bluesky"} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipPositioner>
              <TooltipContent>Bluesky</TooltipContent>
            </TooltipPositioner>
          </Tooltip>
        </div>
        <div>
          <Button asChild color={"primary"} size={"lg"} variant={"filled"}>
            <Link params={(prev) => prev} to={"/{-$locale}/cv"}>
              {m["home.cv"]()}
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export const Route = createFileRoute("/{-$locale}/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "MrSquaare" },
      { content: "MrSquaare's personal website", name: "description" },
    ],
  }),
});
