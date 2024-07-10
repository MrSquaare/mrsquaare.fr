import { Icon } from "@iconify-icon/react";
import {
  Button,
  Navigation,
  NavigationItem,
  NavigationList,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@mrsquaare/sandwich-ui";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../../components/common/language-switcher";
import { ThemeSwitcher } from "../../components/common/theme-switcher";
import { GITHUB_LINK, MAIL_LINK, TWITTER_LINK } from "../../constants/link";
import { useI18n } from "../../lib/i18n/useI18n";
import { useTheme } from "../../lib/theme/useTheme";
import { css, cx } from "../../styled-system/css";
import { container } from "../../styled-system/patterns";

export const meta: MetaFunction = () => {
  return [
    { title: "MrSquaare" },
    { name: "description", content: "MrSquaare's personal website" },
  ];
};

const HomePage: FC = () => {
  const { t } = useTranslation("home");
  const { language } = useI18n();
  const { resolvedTheme } = useTheme();

  return (
    <>
      <div
        className={css({
          position: "fixed",
          top: 0,
          zIndex: 10,
          width: "screen",
        })}
      >
        <Navigation className={css({ px: 4, py: 2 })}>
          <NavigationList>
            <NavigationItem>
              <LanguageSwitcher />
            </NavigationItem>
            <NavigationItem>
              <ThemeSwitcher />
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </div>
      <main
        className={cx(
          container(),
          css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minH: "screen",
          }),
        )}
      >
        <img
          alt={"Logo"}
          className={css({ mb: 4 })}
          height={200}
          src={resolvedTheme === "dark" ? "/icon-dark.svg" : "/icon-light.svg"}
          width={200}
        />
        <h1
          className={css({
            fontSize: "6xl",
            lineHeight: "1.1",
            textAlign: "center",
            mb: 2,
          })}
        >
          {t("title")}{" "}
          <span className={css({ fontWeight: "bold" })}>MrSquaare</span>
        </h1>
        <h2
          className={css({
            fontSize: "2xl",
            lineHeight: "1",
            textAlign: "center",
            mb: 4,
          })}
        >
          {t("subtitle")}
        </h2>
        <div className={css({ display: "flex", spaceX: 4, mb: 2 })}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size={"lg"} variant={"outlined"}>
                <Link
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                  to={MAIL_LINK}
                >
                  <Icon icon={"ph:envelope"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Contact me</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size={"lg"} variant={"outlined"}>
                <Link
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                  to={GITHUB_LINK}
                >
                  <Icon icon={"ph:github-logo"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild size={"lg"} variant={"outlined"}>
                <Link
                  referrerPolicy={"no-referrer"}
                  rel={"noreferrer"}
                  target={"_blank"}
                  to={TWITTER_LINK}
                >
                  <Icon icon={"ph:twitter-logo"} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Twitter (𝕏)</TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Button asChild size={"lg"} variant={"outlined"}>
            <Link to={`/${language}/cv`}>{t("cv")}</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
