import githubIcon from "@iconify/icons-fa-brands/github";
import twitterIcon from "@iconify/icons-fa-brands/twitter";
import envelopeIcon from "@iconify/icons-fa-solid/envelope";
import handIcon from "@iconify/icons-twemoji/raised-hand";
import { Icon, InlineIcon } from "@iconify/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const HomeContent: FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("home");

  return (
    <div className={"flex h-full flex-col justify-center md:flex-row"}>
      <div
        className={
          "mb-4 mr-0 flex flex-col justify-center md:mb-0 md:mr-4 md:flex-[5]"
        }
      >
        <div
          className={"flex flex-row items-center justify-center md:flex-col"}
        >
          <div className={"mr-1 h-24 md:mr-0 md:h-96"}>
            <Icon icon={handIcon} width={"100%"} />
          </div>
          <h1
            className={
              "ml-2 mt-0 text-center text-2xl md:ml-0 md:mt-4 md:text-4xl"
            }
          >
            <code>Hello, World!</code>
          </h1>
        </div>
      </div>
      <div
        className={
          "ml-0 mt-4 flex flex-col justify-center md:ml-4 md:mt-0 md:flex-[7]"
        }
      >
        <div>
          <h1 className={"text-4xl"}>{t("content.title", { lng: locale })}</h1>
          <h2 className={"mb-4 text-2xl"}>
            {t("content.subtitle", { lng: locale })}
          </h2>
          <p className={"mb-4"}>{t("content.body", { lng: locale })}</p>
          <a
            className={"btn btn-lg mb-2 mr-2"}
            href={"mailto:contact@mrsquaare.fr"}
          >
            <InlineIcon className={"mr-1"} icon={envelopeIcon} />
            {t("links.contact", { lng: locale })}
          </a>
          <a
            className={"btn btn-lg mb-2 mr-2"}
            href={"https://github.com/MrSquaare"}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <InlineIcon className={"mr-1"} icon={githubIcon} />
            {t("links.github", { lng: locale })}
          </a>
          <a
            className={"btn btn-lg mb-2 mr-2"}
            href={"https://twitter.com/MrSquaare"}
            rel={"noreferrer"}
            target={"_blank"}
          >
            <InlineIcon className={"mr-1"} icon={twitterIcon} />
            {t("links.twitter", { lng: locale })}
          </a>
        </div>
      </div>
    </div>
  );
};
