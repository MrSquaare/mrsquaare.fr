import spyIcon from "@iconify/icons-twemoji/detective";
import { Icon } from "@iconify/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { WEBSITE_TITLE } from "../constants";

const NotFoundPage: FC = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("notFound");

  return (
    <>
      <Head>
        <title>
          {`${t("page.title", { lng: locale })} - ${WEBSITE_TITLE}`}
        </title>
      </Head>
      <div className={"container mx-auto h-full"}>
        <div
          className={"flex h-full flex-col items-center justify-center py-4"}
        >
          <Icon height={128} icon={spyIcon} />
          <h1 className={"mt-4 text-6xl"}>
            {t("content.title", { lng: locale })}
          </h1>
          <h2 className={"text-2xl"}>
            {t("content.subtitle", { lng: locale })}
          </h2>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
