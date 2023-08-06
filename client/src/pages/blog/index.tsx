import { ArticleMetaDTO } from "@common/types";
import sadIcon from "@iconify/icons-twemoji/sad-but-relieved-face";
import { Icon } from "@iconify/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert, Hero } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { SWRConfig } from "swr";

import { ArticleList } from "../../components";
import { WEBSITE_TITLE } from "../../constants";
import { getArticles, useArticles } from "../../hooks";

const HomePage: NextPage = () => {
  const { locale } = useRouter();
  const { t } = useTranslation("blog", { keyPrefix: "home" });
  const { articles, error } = useArticles();

  return (
    <>
      <Head>
        <title>
          {`${t("page.title", { lng: locale })} - ${WEBSITE_TITLE}`}
        </title>
      </Head>
      <div className={"container mx-auto"}>
        <Hero className={"h-40 bg-base-100"}>
          <Hero.Content>
            <div className={"text-center"}>
              <h1 className={"mb-1 text-3xl"}>
                {t("header.title", { lng: locale })}
              </h1>
              <h2 className={"text-xl"}>
                {t("header.subtitle", { lng: locale })}
              </h2>
            </div>
          </Hero.Content>
        </Hero>
      </div>
      <hr className={"border-base-200"} />
      <div className={"container mx-auto h-full px-4 py-8"}>
        {error && (
          <Alert className={"mb-4"} status={"error"}>
            {error.message}
          </Alert>
        )}
        {articles?.length ? (
          <>
            <div className={"mb-4 text-3xl font-bold"}>
              {t("content.latest", { lng: locale })}
            </div>
            <ArticleList articles={articles} />
          </>
        ) : articles?.length === 0 ? (
          <div className={"flex h-full flex-col items-center justify-center"}>
            <Icon height={128} icon={sadIcon} />
            <p className={"mt-4 text-2xl"}>{t("content.noArticle")}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

type SSRProps = {
  fallback: {
    [id: string]: ArticleMetaDTO[];
  };
};

const HomePageWithSWR: NextPage<SSRProps> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <HomePage />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const { articles } = await getArticles();

  return {
    props: {
      fallback: {
        "/articles": articles ?? null,
      },
    } as SSRProps,
  };
}

export default HomePageWithSWR;
